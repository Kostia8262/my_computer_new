'use strict';

const db = require('./db');

const SEED = [
  { name: 'Марина К.', initials: 'МК', role: 'мама Арсенія, 9 років · Цифровий рисунок',
    text: '"Боялася, що в групі на сина не вистачить уваги. А виявилось навпаки — викладачка бачить, у кого що не виходить, і підлаштовується під кожну дитину. Арсеній тепер сам просить ще одне домашнє завдання!"',
    rating: 5 },
  { name: 'Олег М.', initials: 'ОМ', role: 'тато Дарини, 14 років · Блог та сайт',
    text: '"Донька хотіла навчитися створювати сайти — і за курс зробила справжнє портфоліо, яке вже показує на співбесідах для стажування. Це набагато цінніше, ніж просто оцінка в щоденнику."',
    rating: 5 },
  { name: 'Тетяна В.', initials: 'ТВ', role: 'мама Матвія, 11 років · 3D у Blender',
    text: '"Дуже сподобались матеріали курсу — усе розкладено по поличках, є відеозаписи занять, які можна передивитись перед домашнім завданням. Матвій моделює власні світи в Blender і вже мріє стати 3D-художником."',
    rating: 5 },
  { name: 'Наталя С.', initials: 'НС', role: 'мама Микити, 12 років · UI/UX дизайн',
    text: '"Після курсу Микита отримав справжній сертифікат — і це не просто папірець для шухляди: з готовим проєктом і сертифікатом він уже подавався на дитячий IT-конкурс. Є що показати після навчання!"',
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
