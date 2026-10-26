const field = document.querySelector('#note-search');
const rows = [...document.querySelectorAll('[data-note]')];
const status = document.querySelector('[data-search-status]');
const noResults = document.querySelector('[data-no-results]');
const year = document.querySelector('#archive-year');
const month = document.querySelector('#archive-month');
if (field && rows.length) {
  document.querySelector('[data-search-wrap]').hidden = false;
  const searchIndex = rows.map((row) => row.textContent.normalize('NFKC').toLocaleLowerCase());
  function filterPosts() {
    const query = field.value.normalize('NFKC').trim().toLocaleLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    let count = 0;
    rows.forEach((row, index) => {
      row.hidden = (year.value && row.dataset.year !== year.value) ||
        (month.value && row.dataset.month !== month.value) ||
        !terms.every((term) => searchIndex[index].includes(term));
      if (!row.hidden) count++;
    });
    noResults.hidden = count > 0;
    status.textContent = query || year.value || month.value ? `${count} ${count === 1 ? 'post' : 'posts'} found.` : '';
    document.querySelector('.note-count').textContent = count;
  }
  function readFilters() {
    const params = new URLSearchParams(window.location.search);
    const selectedYear = params.get('year') || '';
    if (/^\d{4}$/.test(selectedYear) && ![...year.options].some((option) => option.value === selectedYear)) {
      year.add(new Option(selectedYear, selectedYear));
    }
    year.value = /^\d{4}$/.test(selectedYear) ? selectedYear : '';
    const selectedMonth = params.get('month') || '';
    month.value = /^(0[1-9]|1[0-2])$/.test(selectedMonth) ? selectedMonth : '';
    field.value = params.get('q') || '';
    filterPosts();
  }
  function updateFilters() {
    const url = new URL(window.location.href);
    for (const [key, value] of [['year', year.value], ['month', month.value], ['q', field.value.trim()]]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, '', url);
    filterPosts();
  }
  field.addEventListener('input', updateFilters);
  year.addEventListener('change', updateFilters);
  month.addEventListener('change', updateFilters);
  window.addEventListener('popstate', readFilters);
  readFilters();
}
