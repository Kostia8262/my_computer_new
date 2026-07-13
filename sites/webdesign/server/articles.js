'use strict';

const db = require('./db');

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[а-яёіїєґ]/g, c => ({
      'а':'a','б':'b','в':'v','г':'h','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y',
      'і':'i','ї':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
      'с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch',
      'ь':'','ю':'iu','я':'ia','ё':'e','ґ':'g',
    }[c] || c))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    title_ru: row.title_ru,
    excerpt: row.excerpt,
    excerpt_ru: row.excerpt_ru,
    content: row.content,
    content_ru: row.content_ru,
    category: row.category,
    coverEmoji: row.cover_emoji,
    author: row.author,
    publishedAt: row.published_at,
    active: !!row.active,
  };
}

const selAll     = db.prepare('SELECT * FROM articles ORDER BY sort_order ASC, id DESC');
const selActive  = db.prepare("SELECT * FROM articles WHERE active != 0 ORDER BY sort_order ASC, id DESC");
const selBySlug  = db.prepare('SELECT * FROM articles WHERE slug = ?');
const selBySlugExcl = db.prepare('SELECT * FROM articles WHERE slug = ? AND id != ?');
const selMaxSort = db.prepare('SELECT MIN(sort_order) AS m FROM articles');
const insArticle = db.prepare(`INSERT INTO articles
  (slug, title, title_ru, excerpt, excerpt_ru, content, content_ru, category, cover_emoji, author, published_at, active, sort_order)
  VALUES (@slug, @title, @title_ru, @excerpt, @excerpt_ru, @content, @content_ru, @category, @cover_emoji, @author, @published_at, @active, @sort_order)`);
const delArticle = db.prepare('DELETE FROM articles WHERE id = ?');

module.exports = {
  getAll()    { return db.prepare('SELECT * FROM articles ORDER BY sort_order ASC, id DESC').all().map(fromRow); },
  getActive() { return selActive.all().map(fromRow); },

  getBySlug(slug) {
    return slug ? fromRow(selBySlug.get(slug)) : null;
  },

  create(data) {
    const slug = data.slug || slugify(data.title || '') || `article-${Date.now()}`;
    if (selBySlug.get(slug)) return null;
    const minSort = selMaxSort.get().m;
    const info = insArticle.run({
      slug,
      title:       data.title       || '',
      title_ru:    data.title_ru    || '',
      excerpt:     data.excerpt     || '',
      excerpt_ru:  data.excerpt_ru  || '',
      content:     data.content     || '',
      content_ru:  data.content_ru  || '',
      category:    data.category    || 'навчання',
      cover_emoji: data.coverEmoji  || '📄',
      author:      data.author      || 'My Computer Academy',
      published_at: data.publishedAt || new Date().toISOString().slice(0, 10),
      active:      data.active !== false ? 1 : 0,
      sort_order:  (minSort ?? 0) - 1, // new articles go first, like unshift() did
    });
    return fromRow(db.prepare('SELECT * FROM articles WHERE id = ?').get(info.lastInsertRowid));
  },

  update(id, data) {
    const existing = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    if (!existing) return null;
    const allowed = ['title','title_ru','excerpt','excerpt_ru','content','content_ru','category','coverEmoji','author','publishedAt','active','slug'];
    const colMap = {
      title: 'title', title_ru: 'title_ru', excerpt: 'excerpt', excerpt_ru: 'excerpt_ru',
      content: 'content', content_ru: 'content_ru', category: 'category', coverEmoji: 'cover_emoji',
      author: 'author', publishedAt: 'published_at', active: 'active', slug: 'slug',
    };
    const sets = [];
    const params = { id };
    allowed.forEach(k => {
      if (!(k in data)) return;
      if (k === 'slug' && selBySlugExcl.get(data.slug, id)) return; // don't create a duplicate slug
      const col = colMap[k];
      let val = data[k];
      if (k === 'active') val = val !== false ? 1 : 0;
      sets.push(`${col} = @${col}`);
      params[col] = val;
    });
    if (sets.length === 0) return fromRow(existing);
    db.prepare(`UPDATE articles SET ${sets.join(', ')} WHERE id = @id`).run(params);
    return fromRow(db.prepare('SELECT * FROM articles WHERE id = ?').get(id));
  },

  delete(id) {
    return delArticle.run(id).changes > 0;
  },
};
