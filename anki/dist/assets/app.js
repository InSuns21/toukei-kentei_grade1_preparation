(() => {
  const cardsRoot = document.querySelector("#cards");
  const cards = [...document.querySelectorAll(".card")];
  const search = document.querySelector("#search");
  const category = document.querySelector("#category");
  const subcategory = document.querySelector("#subcategory");
  const sort = document.querySelector("#sort");
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty");
  const difficulty = [...document.querySelectorAll('[name="difficulty"]')];
  const tagFilters = [...document.querySelectorAll("[data-filter-tag]")];
  const selectedTags = new Set();
  const priorityRank = { S: 0, A: 1, B: 2, C: 3, D: 4 };

  function normalize(value) {
    return value.normalize("NFKC").toLocaleLowerCase("ja").trim();
  }

  function apply() {
    const term = normalize(search.value);
    const levels = new Set(difficulty.filter((item) => item.checked).map((item) => item.value));
    let visible = 0;
    for (const card of cards) {
      const tags = new Set(card.dataset.tags.split("|"));
      const matches = (!term || normalize(card.dataset.search).includes(term))
        && (!category.value || card.dataset.category === category.value)
        && (!subcategory.value || card.dataset.subcategory === subcategory.value)
        && (!levels.size || levels.has(card.dataset.difficulty))
        && (!selectedTags.size || [...selectedTags].some((tag) => tags.has(tag)));
      card.hidden = !matches;
      if (matches) visible += 1;
    }
    count.textContent = `このページで表示中 ${visible} / ${cards.length} cards`;
    empty.hidden = visible !== 0;
  }

  function applySort() {
    const mode = sort.value;
    const sorted = [...cards].sort((a, b) => {
      if (mode === "difficulty") return Number(a.dataset.difficulty) - Number(b.dataset.difficulty) || Number(a.dataset.order) - Number(b.dataset.order);
      if (mode === "priority") return priorityRank[a.dataset.priority] - priorityRank[b.dataset.priority] || Number(a.dataset.order) - Number(b.dataset.order);
      if (mode === "frequency") return Number(b.dataset.frequency) - Number(a.dataset.frequency) || Number(a.dataset.order) - Number(b.dataset.order);
      if (mode === "title") return a.dataset.title.localeCompare(b.dataset.title, "ja");
      return Number(a.dataset.order) - Number(b.dataset.order);
    });
    sorted.forEach((card) => cardsRoot.append(card));
  }

  [search, category, subcategory].forEach((control) => control.addEventListener("input", apply));
  difficulty.forEach((control) => control.addEventListener("change", apply));
  sort.addEventListener("change", applySort);
  tagFilters.forEach((button) => button.addEventListener("click", () => {
    const tag = button.dataset.filterTag;
    selectedTags.has(tag) ? selectedTags.delete(tag) : selectedTags.add(tag);
    button.classList.toggle("active", selectedTags.has(tag));
    button.setAttribute("aria-pressed", String(selectedTags.has(tag)));
    apply();
  }));
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tag-action]");
    if (!button) return;
    const target = tagFilters.find((item) => item.dataset.filterTag === button.dataset.tagAction);
    if (target && !selectedTags.has(button.dataset.tagAction)) target.click();
    document.querySelector(".controls").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = ""; category.value = ""; subcategory.value = ""; sort.value = "syllabus";
    difficulty.forEach((item) => { item.checked = false; });
    selectedTags.clear();
    tagFilters.forEach((item) => { item.classList.remove("active"); item.setAttribute("aria-pressed", "false"); });
    applySort(); apply();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !/input|select|textarea/i.test(document.activeElement.tagName)) { event.preventDefault(); search.focus(); }
  });
  if (location.hash) document.querySelector(location.hash)?.setAttribute("data-linked", "true");
  apply();
})();
