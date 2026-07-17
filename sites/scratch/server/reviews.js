'use strict';

const db = require('./db');

const SEED = [
  { name: 'Марина К.', initials: 'МК', role: 'мама Арсенія, 7 років · Scratch',
    text: '"Син 7 років почав з нуля на курсі Scratch. Через 2 місяці сам зробив анімовану листівку для бабусі!"',
    rating: 5 },
  { name: 'Олег М.', initials: 'ОМ', role: 'тато Дарини, 9 років · Scratch',
    text: '"Донька дуже любить малювати, тепер малює персонажів і одразу оживляє їх кодом. У захваті!"',
    rating: 5 },
  { name: 'Тетяна В.', initials: 'ТВ', role: 'мама Матвія, 8 років · Scratch',
    text: '"Син раніше просто грав в ігри, тепер робить власні. Показує кожному, хто заходить у гості."',
    rating: 5 },
  { name: 'Наталя С.', initials: 'НС', role: 'мама Микити, 6 років · Scratch',
    text: '"Боялися, що дитині ще рано у 6 років. Даремно — все зрозуміло пояснюють через гру, син у захваті."',
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
