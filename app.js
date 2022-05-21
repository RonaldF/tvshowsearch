// search endpoint https://api.tvmaze.com/search/shows?q=[searchTerm]

const form = document.querySelector('#searchForm');
const searchContainer = document.querySelector('#search');
const resultsContainer = document.querySelector('#results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);
    resultsContainer.innerHTML = '';
    displayResults(res.data);
    form.elements.query.value = '';
  } catch (err) {
    const errMsg = document.createElement('p');
    errMsg.classList.add('errorMsg');
    errMsg.innerHTML = 'Unable to find results';
    searchContainer.append(errMsg);
  }
});

const displayResults = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const card = document.createElement('div');
      card.classList.add('search-card');
      const img = document.createElement('img');
      img.src = result.show.image.medium;
      img.alt = result.show.name;
      card.append(img);
      const name = document.createElement('p');
      name.classList.add('search-name');
      name.innerText = result.show.name;
      card.append(name);
      resultsContainer.append(card);
    }
  }
};
