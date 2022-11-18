import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "redaxios";
import { useStorage } from "@vueuse/core";

export const useDataStore = defineStore("data", () => {
  const people = ref(
    localStorage.people ? JSON.parse(localStorage.people) : []
  );

  const isLoading = ref(localStorage.people ? false : true);

  const searchResults = ref(
    localStorage.people ? JSON.parse(localStorage.people) : []
  );

  const species = ref(
    localStorage.species ? JSON.parse(localStorage.species) : []
  );

  const movies = ref(
    localStorage.movies ? JSON.parse(localStorage.movies) : []
  );

  const nameSearchWord = ref();
  const birthYearRange = ref();
  const filteredSpecies = ref();
  const filteredMovies = ref();

  async function fetchData() {
    const promises = [];

    async function getData(url) {
      let nextPage = url;
      let dataArray = [];
      while (nextPage) {
        const response = await axios.get(nextPage).then((res) => res.data);
        promises.push(response);
        nextPage = response.next;
        dataArray = [...dataArray, ...response.results];
        console.log(response);
      }
      return dataArray;
    }

    const peopleResponse = await getData("https://swapi.dev/api/people");
    const moviesResponse = await getData("https://swapi.dev/api/films");
    const speciesResponse = await getData("https://swapi.dev/api/species");
    const planetsResponse = await getData("https://swapi.dev/api/planets");

    function getIndexFromUrl(url) {
      return +url.replace(/[^0-9]/g, "") - 1;
    }

    //Once all data is loaded, mutate the data for easier local search
    //and add it to the store and local storage
    Promise.allSettled(promises)
      .then(
        peopleResponse.forEach((person) => {
          person.films.forEach((film, index) => {
            person.films[index] = moviesResponse[getIndexFromUrl(film)]?.title;
          });
          if (person.species.length === 0) {
            person.species = "Human";
          } else {
            person.species =
              speciesResponse[getIndexFromUrl(person.species[0])].name;
          }
          person.homeworld =
            planetsResponse[getIndexFromUrl(person.homeworld)].name;
        }),
        ((people.value = [...peopleResponse]),
        (searchResults.value = [...people.value]),
        useStorage("people", JSON.stringify(people.value)),
        useStorage(
          "species",
          JSON.stringify(speciesResponse.map((species) => species.name))
        )),
        useStorage(
          "movies",
          JSON.stringify(moviesResponse.map((movie) => movie.title))
        )
      )
      .then((isLoading.value = false));
  }

  function filter() {
    searchResults.value = [...people.value];

    if (nameSearchWord.value) {
      searchResults.value = searchResults.value.filter((person) => {
        return person.name
          .toUpperCase()
          .includes(nameSearchWord.value.toUpperCase());
      });
    }

    if (birthYearRange.value) {
      searchResults.value = searchResults.value.filter((person) => {
        if (person.birth_year !== "unknown") {
          return (
            +person.birth_year.slice(0, -3) >= birthYearRange.value[0] &&
            +person.birth_year.slice(0, -3) <= birthYearRange.value[1]
          );
        }
      });
    }

    if (filteredSpecies.value && filteredSpecies.value.length !== 0) {
      searchResults.value = searchResults.value.filter((person) =>
        filteredSpecies.value.some((species) => species === person.species)
      );
    }

    if (filteredMovies.value && filteredMovies.value.length !== 0) {
      searchResults.value = searchResults.value.filter((person) =>
        filteredMovies.value.some((movie) => person.films.includes(movie))
      );
    }
  }

  return {
    people,
    searchResults,
    isLoading,
    species,
    movies,
    fetchData,
    nameSearchWord,
    birthYearRange,
    filteredSpecies,
    filteredMovies,
    filter,
  };
});
