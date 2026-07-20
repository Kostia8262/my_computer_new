'use strict';

const db = require('./db');

const SEED = [
  { name: 'Алла', initials: 'АК', role: 'мама, Дніпро · Створення блогу',
    text: '"Син почав вести блог і вже за 2 місяці змонтував перше відео в Premiere Pro. Викладачка дуже терпляча, багато практики і живого фідбеку."',
    rating: 5 },
  { name: 'Олег', initials: 'ОП', role: 'тато, Київ · Створення блогу',
    text: '"Курс допоміг доньці зрозуміти основи SMM без зайвої теорії. Вона веде власну сторінку і тепер мріє про кар\'єру в маркетингу."',
    rating: 5 },
  { name: 'Наталя', initials: 'НС', role: 'мама, Львів · Створення блогу',
    text: '"Зручний формат та час занять, зрозумілі домашні завдання і уважні викладачі. Дитина впевнено рухається вперед. Нам особливо зайшли уроки з After Effects."',
    rating: 4 },
  { name: 'Вікторія Мельник', initials: 'ВМ', role: 'мама, Дніпро · Створення блогу',
    text: '"Син ходить на курс вже 3 місяці і запустив власний блог із першими постами та відео. Викладач завжди на зв\'язку, дає корисний зворотний зв\'язок після кожної роботи."',
    rating: 5 },
];

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id, name: row.name, initials: row.initials, role: row.role, text: row.text,
    rating: row.rating, active: !!row.active, createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

const selAll  = db.prepare('SELECT * FROM reviews ORDER BY id ASC');
const selById = db.prepare('SELECT * FROM reviews WHERE id = ?');
const insReview = db.prepare(`INSERT INTO reviews (name, initials, role, text, rating, active, created_at)
  VALUES (@name, @initials, @role, @text, @rating, 1, @created_at)`);
const delReview = db.prepare('DELETE FROM reviews WHERE id = ?');

// Seed on first run, same as the JSON version's SEED-if-empty behavior.
if (selAll.all().length === 0) {
  const tx = db.transaction(() => {
    for (const r of SEED) {
      insReview.run({ ...r, created_at: new Date().toISOString() });
    }
  });
  tx();
}

module.exports = {
  getAll()    { return selAll.all().map(fromRow); },
  getActive() { return selAll.all().map(fromRow).filter(r => r.active !== false); },

  create(data) {
    const initials = data.initials || (data.name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const info = insReview.run({
      name: data.name || '', initials, role: data.role || '', text: data.text || '',
      rating: Math.min(5, Math.max(1, parseInt(data.rating) || 5)),
      created_at: new Date().toISOString(),
    });
    return fromRow(selById.get(info.lastInsertRowid));
  },

  update(id, data) {
    const existing = selById.get(id);
    if (!existing) return null;
    const colMap = { name: 'name', initials: 'initials', role: 'role', text: 'text', rating: 'rating', active: 'active' };
    const sets = ['updated_at = @updated_at'];
    const params = { id, updated_at: new Date().toISOString() };
    Object.keys(colMap).forEach(k => {
      if (!(k in data)) return;
      let val = data[k];
      if (k === 'rating') val = Math.min(5, Math.max(1, parseInt(val) || 5));
      if (k === 'active') val = val !== false ? 1 : 0;
      sets.push(`${colMap[k]} = @${colMap[k]}`);
      params[colMap[k]] = val;
    });
    db.prepare(`UPDATE reviews SET ${sets.join(', ')} WHERE id = @id`).run(params);
    return fromRow(selById.get(id));
  },

  delete(id) {
    return delReview.run(id).changes > 0;
  },
};
