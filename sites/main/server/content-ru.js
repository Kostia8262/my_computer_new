'use strict';

// Russian-language mirror of ARTICLES_SEED / COURSE_SEED / COURSE_SEO_* in server.js.
// Ukrainian stays the primary/default version; these are served when ?lang=ru is present.
//
// STATUS: technical infrastructure only — maps are intentionally empty for now.
// Server routes/client rendering already read these and fall back to the Ukrainian
// content whenever an entry is missing, and hreflang="ru" is only emitted for an
// item once it actually has a translation here. Fill in translations per course/
// article/doc below and they go live on the next deploy with zero further code
// changes.

const ARTICLES_RU = {
  // slug: { title, excerpt, content }
};

const COURSES_RU = {
  // id: { name, description }
};

const COURSE_SEO_TITLES_RU = {
  // id: 'RU SEO <title>'
};

const COURSE_SEO_DESCS_RU = {
  // id: 'RU meta description (140-160 chars)'
};

const COURSE_SEO_TEXTS_RU = {
  // id: 'RU hidden crawler-visible text block'
};

const CURRICULA_RU = {
  // id: [ { title, desc }, ... ]  — same order/length as server/curricula.js
};

const DOCS_SEO_RU = {
  // id: { title, desc }
};

const ARTICLES_INDEX_RU = {
  // { title, desc }
};

module.exports = {
  ARTICLES_RU, COURSES_RU, COURSE_SEO_TITLES_RU, COURSE_SEO_DESCS_RU,
  COURSE_SEO_TEXTS_RU, CURRICULA_RU, DOCS_SEO_RU, ARTICLES_INDEX_RU,
};
