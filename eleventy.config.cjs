module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addFilter("readableDate", (date) => new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC"
  }).format(new Date(date)));
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("first", (items, count = 3) => items.slice(0, count));
  eleventyConfig.addFilter("excludeExamples", (items) => items.filter((note) => !note.data.example));
  eleventyConfig.addFilter("monthGroups", (notes) => {
    const groups = new Map();
    for (const note of notes) {
      const date = new Date(note.date);
      const key = date.toISOString().slice(0, 7);
      if (!groups.has(key)) groups.set(key, {
        key, year: key.slice(0, 4), month: key.slice(5), count: 0,
        label: new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(date)
      });
      groups.get(key).count++;
    }
    return [...groups.values()].sort((a, b) => b.key.localeCompare(a.key));
  });
  eleventyConfig.addFilter("archiveYears", (notes) => [...new Set(notes.map((note) =>
    new Date(note.date).toISOString().slice(0, 4)))].sort().reverse());
  eleventyConfig.addCollection("notes", (api) => api.getFilteredByGlob("src/notes/*.md")
    .filter((note) => !note.data.draft)
    .sort((a, b) => b.date - a.date || a.fileSlug.localeCompare(b.fileSlug)));
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
