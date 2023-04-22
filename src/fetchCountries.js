export function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => response.json());
}
