# Personal academic website

A minimal English-language academic homepage and paper reading journal, built with Eleventy and Markdown. After deployment: **https://chenhao-zhang.github.io/**. No Cloudflare account, database, paid theme, or paid domain is required.

Includes Home, an Article placeholder, a searchable Blog, reading-note pages, and a custom 404 page. Uses local fonts, with no third-party trackers or remote font services.

## Edit your profile

Edit **`src/_data/site.json`**: name, the education entries in `education`, the `researchInterests` list, and optional email. Empty email hides the email link. Keep JSON strings in double quotes, without trailing commas.

The homepage has a text-only profile and Blog month cards generated from published posts, newest month first. Each card opens the Blog with that year and month selected. Month cards include the existing sample until you remove it. New posts automatically update the month cards and post counts.

## Write a reading note

1. Copy **`templates/reading-note.md`** into `src/notes/`.
2. Name it something unique, e.g. `2026-10-23-short-paper-title.md`.
3. Edit the metadata between `---`, then write below it.
4. Change **`draft: true` to `draft: false`** to publish.
5. Commit. After deployment, Home and Blog update automatically, newest first.

The filename becomes its URL: `/blog/2026-10-23-short-paper-title/`. `date` is your reading date, not the paper's publication year. Future dates do not schedule publication: all non-draft notes publish immediately. Optional `updated: 2026-10-24` displays an updated date. `paperUrl` accepts a DOI, publisher, or arXiv URL; leave empty to hide the link. Quote metadata strings, especially titles containing `:`.

Drafts are excluded from generated pages and lists, but files in this public repository remain public. Blog entries show dates, topics, titles, descriptions, and paper citations, newest first. Search matches these fields and works together with Year and Month filters. Filter choices are saved in the page URL, so monthly links can be bookmarked or shared. Filtering requires JavaScript; without it, the complete Blog list remains available.

Delete `src/notes/2026-10-23-a-sample-reading-note.md` when you no longer need the example. It is explicitly marked as a sample, not a real paper summary. An empty journal is supported.

### Write directly on GitHub

Open the repository → **Add file → Create new file**. Enter `src/notes/2026-10-23-short-paper-title.md`, paste the template, edit it, set `draft: false`, then **Commit changes**. No local software is needed for everyday writing.

## Preview locally

With Node.js 22 or later, open a terminal in this project folder:

```sh
npm ci
npm start
```

Open the localhost address shown (normally **http://localhost:8080**). Changes rebuild automatically. Stop with Ctrl+C.

Build and check the production site:

```sh
npm run build
npm run check
```

Edit files in `src/`. `_site/` is generated and overwritten on each build. `node_modules/`, `_site/`, and `.npm-cache/` are ignored by Git.

## Publish on GitHub Pages for free

1. Upload the source, `package-lock.json`, and `.github/workflows/deploy.yml` to this repository's **main** branch.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**. Do not choose "Deploy from a branch": this project needs the included Eleventy build workflow.
4. Open **Actions → Deploy to GitHub Pages → Run workflow**, select `main`, and run it. Further pushes to `main` deploy automatically.
5. Once `build` and `deploy` succeed, visit **https://chenhao-zhang.github.io/**.

Use a Git client to commit local changes and push to `main`. Never upload `node_modules/` or `_site/`. If a workflow fails, open its failed step to read the message. Creating local files alone does not publish the site: the changes must reach GitHub and Pages must use GitHub Actions.

This project assumes the account-level `Chenhao-Zhang.github.io` repository, hosted at the domain root. GitHub Free supports Pages for this public repository.

## File guide

```text
src/_data/site.json             Your profile and site settings
src/index.njk                   Homepage
src/article.njk                 Article placeholder
src/blog.njk                    Reading list
src/notes/                      Markdown reading notes
src/_includes/                  Page layouts
src/assets/css/style.css        Design and responsive styles
src/assets/images/              Photo and favicon
src/assets/js/search.js         Reading-list search
templates/reading-note.md       Copyable writing template
eleventy.config.cjs             Build configuration
scripts/check-site.mjs          Generated-site checks
.github/workflows/deploy.yml    GitHub Pages deployment
```

All interface text is English. Notes may be written in English or Chinese. Change colors and fonts at the top of `src/assets/css/style.css`. Article is reserved for academic publications; its content area is intentionally blank for now.
