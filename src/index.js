import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const onInput = document.querySelector('input#search-box');
const ulCountryList = document.querySelector('.country-list');
const divCountryInfo = document.querySelector('.country-info');

// -----
onInput.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(evt) {
  evt.preventDefault();
  const countryName = onInput.value.trim();

  fetchCountries(countryName).then(renderCountry).catch(errorCountry);
}

function renderCountry(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    data.length < 2 ? insertContentDiv(data) : insertContent(data);
  }
}

function errorCountry(error) {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
  ulCountryList.innerHTML = '';
  divCountryInfo.innerHTML = '';
}

// ----
const createlist = data =>
  `<li>
    <p>
        <img src='${data.flags.svg}' alt='${data.flags.alt}' width='30px'>
        ${data.name.official} 
    </p>
</li>`;

const generateContent = array =>
  array?.reduce((acc, data) => acc + createlist(data), '');

const insertContent = array => {
  const result = generateContent(array);
  ulCountryList.innerHTML = result;
  divCountryInfo.innerHTML = '';
};
// ---
const createlistDiv = data => `
<h2>
    <img src='${data.flags.svg}' alt='${data.flags.alt}' width='40px'>
    ${data.name.official}
</h2>
<ul>
    <li><p>Capital: ${data.capital}</p></li>
    <li><p>Population: ${data.population}</p></li>
    <li><p>Languages: ${Object.values(data.languages)}</p></li>
</ul>
`;
const generateContentDiv = array =>
  array?.reduce((acc, data) => acc + createlistDiv(data), '');

const insertContentDiv = array => {
  const resultDiv = generateContentDiv(array);
  divCountryInfo.innerHTML = resultDiv;
  ulCountryList.innerHTML = '';
};
