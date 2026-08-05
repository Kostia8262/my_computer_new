'use strict';
/** Создаёт тестовых сотрудников всех ролей и сохраняет их токены в tokens.json. */

const fs = require('fs');
const path = require('path');
const { post, get, SUPER } = require('./lib');

(async () => {
  const out = { super: SUPER };

  for (const role of ['administrator', 'manager', 'teacher']) {
    const r = await post('/api/admins', { name: `ТЕСТ ${role}`, role }, { token: SUPER });
    if (r.status !== 201) { console.error(`Не удалось создать ${role}:`, r.status, r.text.slice(0, 200)); process.exit(1); }
    out[role] = r.json.admin.token;
    out[role + '_id'] = r.json.admin.id;
    console.log(`${role.padEnd(14)} id=${r.json.admin.id} token=${r.json.admin.token.slice(0, 12)}…`);
  }

  // Отозванный сотрудник — для проверки, что отозванный токен перестаёт работать.
  const rev = await post('/api/admins', { name: 'ТЕСТ revoked', role: 'administrator' }, { token: SUPER });
  out.revoked = rev.json.admin.token;
  out.revoked_id = rev.json.admin.id;
  const { patch } = require('./lib');
  await patch(`/api/admins/${rev.json.admin.id}/revoke`, {}, { token: SUPER });
  console.log(`revoked        id=${rev.json.admin.id} token=${rev.json.admin.token.slice(0, 12)}…`);

  fs.writeFileSync(path.join(__dirname, 'tokens.json'), JSON.stringify(out, null, 2));
  console.log('\ntokens.json записан');
})();
