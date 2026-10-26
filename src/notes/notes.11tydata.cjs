module.exports = {
  layout: "note.njk",
  section: "note",
  eleventyComputed: {
    permalink: (data) => data.draft ? false : `/blog/${data.page.fileSlug}/index.html`
  }
};
