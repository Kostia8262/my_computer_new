'use strict';

const db = require('./db');

const DEFAULT_CURRICULUM = [
  { num: 'Модуль 1', title: 'Вступ та основи',      desc: 'Знайомство з інструментами та середовищем. Перші практичні кроки та базові концепції курсу.' },
  { num: 'Модуль 2', title: 'Ключові концепції',    desc: 'Детальне вивчення ключових понять і технік. Практичні завдання для закріплення матеріалу.' },
  { num: 'Модуль 3', title: 'Практичні проекти',    desc: 'Застосування знань на реальних мінізавданнях. Самостійна робота та розбір типових помилок.' },
  { num: 'Модуль 4', title: 'Просунутий рівень',    desc: 'Ускладнені теми та нові інструменти. Творчі завдання з елементами самостійного дослідження.' },
  { num: 'Фінал',    title: 'Підсумковий проект',   desc: 'Учень самостійно розробляє та презентує фінальний проект. Сертифікат про завершення курсу.' },
];

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    emoji: row.emoji,
    age: row.age,
    duration: row.duration,
    lessonsCount: row.lessons_count,
    groupSize: row.group_size,
    price: row.price,
    description: row.description,
    color: row.color,
    active: !!row.active,
    curriculum: JSON.parse(row.curriculum || '[]'),
  };
}

const selAll   = db.prepare('SELECT * FROM courses ORDER BY sort_order ASC, rowid ASC');
const selById  = db.prepare('SELECT * FROM courses WHERE id = ?');
const selMaxSort = db.prepare('SELECT MAX(sort_order) AS m FROM courses');
const insCourse = db.prepare(`INSERT INTO courses
  (id, name, emoji, age, duration, lessons_count, group_size, price, description, color, active, curriculum, sort_order)
  VALUES (@id, @name, @emoji, @age, @duration, @lessons_count, @group_size, @price, @description, @color, @active, @curriculum, @sort_order)`);
const delCourse = db.prepare('DELETE FROM courses WHERE id = ?');

module.exports = {
  getAll()    { return selAll.all().map(fromRow); },
  getActive() { return selAll.all().map(fromRow).filter(c => c.active !== false); },

  create(data) {
    const id = data.id || ('course_' + Date.now());
    if (selById.get(id)) return null; // duplicate
    const maxSort = selMaxSort.get().m;
    insCourse.run({
      id,
      name:            data.name        || '',
      emoji:           data.emoji       || '📚',
      age:             data.age         || '',
      duration:        data.duration    || '',
      lessons_count:   parseInt(data.lessonsCount) || 0,
      group_size:      parseInt(data.groupSize)    || 0,
      price:           parseFloat(data.price)      || 0,
      description:     data.description || '',
      color:           data.color       || '#6C47FF',
      active:          data.active !== false ? 1 : 0,
      curriculum:      JSON.stringify(
        Array.isArray(data.curriculum) && data.curriculum.length > 0 ? data.curriculum : DEFAULT_CURRICULUM
      ),
      sort_order: (maxSort ?? -1) + 1,
    });
    return fromRow(selById.get(id));
  },

  update(id, data) {
    const existing = selById.get(id);
    if (!existing) return null;
    const colMap = {
      name: 'name', emoji: 'emoji', age: 'age', duration: 'duration',
      lessonsCount: 'lessons_count', groupSize: 'group_size', price: 'price',
      description: 'description', color: 'color', active: 'active', curriculum: 'curriculum',
    };
    const sets = [];
    const params = { id };
    Object.keys(colMap).forEach(k => {
      if (!(k in data)) return;
      const col = colMap[k];
      let val = data[k];
      if (k === 'lessonsCount' || k === 'groupSize') val = parseInt(val) || 0;
      else if (k === 'price') val = parseFloat(val) || 0;
      else if (k === 'curriculum') val = JSON.stringify(Array.isArray(val) ? val : []);
      else if (k === 'active') val = val !== false ? 1 : 0;
      sets.push(`${col} = @${col}`);
      params[col] = val;
    });
    if (sets.length === 0) return fromRow(existing);
    db.prepare(`UPDATE courses SET ${sets.join(', ')} WHERE id = @id`).run(params);
    return fromRow(selById.get(id));
  },

  delete(id) {
    return delCourse.run(id).changes > 0;
  },
};
