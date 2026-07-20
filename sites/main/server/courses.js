'use strict';

const db = require('./db');
const { CURRICULA_RU } = require('./content-ru');

const DEFAULT_CURRICULUM = [
  { num: 'Модуль 1', title: 'Вступ та основи',      desc: 'Знайомство з інструментами та середовищем. Перші практичні кроки та базові концепції курсу.' },
  { num: 'Модуль 2', title: 'Ключові концепції',    desc: 'Детальне вивчення ключових понять і технік. Практичні завдання для закріплення матеріалу.' },
  { num: 'Модуль 3', title: 'Практичні проекти',    desc: 'Застосування знань на реальних мінізавданнях. Самостійна робота та розбір типових помилок.' },
  { num: 'Модуль 4', title: 'Просунутий рівень',    desc: 'Ускладнені теми та нові інструменти. Творчі завдання з елементами самостійного дослідження.' },
  { num: 'Фінал',    title: 'Підсумковий проект',   desc: 'Учень самостійно розробляє та презентує фінальний проект. Сертифікат про завершення курсу.' },
];

// Curriculum modules are stored UA-only in the DB. RU translations live
// separately in content-ru.js's CURRICULA_RU, index-aligned per course id
// (confirmed 1:1 with the live DB curriculum before wiring this up — see
// commit message). Merged in here so every consumer of courses.js (the
// public API, course.html's client render) gets title_ru/desc_ru for free,
// instead of only the previous SSR-only hidden SEO block having them.
function withCurriculumRu(id, curriculum) {
  const ruItems = CURRICULA_RU[id];
  if (!Array.isArray(ruItems)) return curriculum;
  return curriculum.map((m, i) => ruItems[i]
    ? { ...m, title_ru: ruItems[i].title, desc_ru: ruItems[i].desc }
    : m);
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    name_ru: row.name_ru,
    emoji: row.emoji,
    age: row.age,
    age_group: row.age_group,
    duration: row.duration,
    lessonsCount: row.lessons_count,
    groupSize: row.group_size,
    price: row.price,
    description: row.description,
    description_ru: row.description_ru,
    features: JSON.parse(row.features || '[]'),
    popular: !!row.popular,
    color: row.color,
    active: !!row.active,
    curriculum: withCurriculumRu(row.id, JSON.parse(row.curriculum || '[]')),
  };
}

const selAll   = db.prepare('SELECT * FROM courses ORDER BY sort_order ASC, rowid ASC');
const selById  = db.prepare('SELECT * FROM courses WHERE id = ?');
const selMaxSort = db.prepare('SELECT MAX(sort_order) AS m FROM courses');
const insCourse = db.prepare(`INSERT INTO courses
  (id, name, name_ru, emoji, age, age_group, duration, lessons_count, group_size, price, description, description_ru, features, popular, color, active, curriculum, sort_order)
  VALUES (@id, @name, @name_ru, @emoji, @age, @age_group, @duration, @lessons_count, @group_size, @price, @description, @description_ru, @features, @popular, @color, @active, @curriculum, @sort_order)`);
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
      name_ru:         data.name_ru     || '',
      emoji:           data.emoji       || '📚',
      age:             data.age         || '',
      age_group:       data.age_group   || '',
      duration:        data.duration    || '',
      lessons_count:   parseInt(data.lessonsCount) || 0,
      group_size:      parseInt(data.groupSize)    || 0,
      price:           parseFloat(data.price)      || 0,
      description:     data.description || '',
      description_ru:  data.description_ru || '',
      features:        JSON.stringify(Array.isArray(data.features) ? data.features : []),
      popular:         data.popular ? 1 : 0,
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
      name: 'name', name_ru: 'name_ru', emoji: 'emoji', age: 'age', age_group: 'age_group',
      duration: 'duration', lessonsCount: 'lessons_count', groupSize: 'group_size', price: 'price',
      description: 'description', description_ru: 'description_ru', features: 'features',
      popular: 'popular', color: 'color', active: 'active', curriculum: 'curriculum',
    };
    const sets = [];
    const params = { id };
    Object.keys(colMap).forEach(k => {
      if (!(k in data)) return;
      const col = colMap[k];
      let val = data[k];
      if (k === 'lessonsCount' || k === 'groupSize') val = parseInt(val) || 0;
      else if (k === 'price') val = parseFloat(val) || 0;
      else if (k === 'features') val = JSON.stringify(Array.isArray(val) ? val : []);
      else if (k === 'curriculum') val = JSON.stringify(Array.isArray(val) ? val : []);
      else if (k === 'popular') val = val ? 1 : 0;
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

  move(id, direction) {
    const all = selAll.all();
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return null;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= all.length) return fromRow(all[idx]);
    const reordered = all.slice();
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
    const updSort = db.prepare('UPDATE courses SET sort_order = ? WHERE id = ?');
    reordered.forEach((row, i) => updSort.run(i, row.id));
    return fromRow(selById.get(id));
  },
};
