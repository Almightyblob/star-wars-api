import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "redaxios";

export const useDataStore = defineStore("data", () => {
  const data = ref([]);
  const isLoading = ref(true);
  const searchResults = ref([]);

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
      }
      return dataArray;
    }

    const people = await getData("https://swapi.dev/api/people");
    const movies = await getData("https://swapi.dev/api/films");
    const species = await getData("https://swapi.dev/api/species");

    function getIndexFromUrl(url) {
      return +url.replace(/[^0-9]/g, "") - 1;
    }

    Promise.allSettled(promises)
      .then(
        people.forEach((person) => {
          person.films.forEach((film, index) => {
            person.films[index] = movies[getIndexFromUrl(film)]?.title;
          });
          console.log(person.species.length);
          if (person.species.length === 0) {
            person.species = "Human";
          } else {
            person.species = species[getIndexFromUrl(person.species[0])].name;
          }
        }),
        ((data.value = [...people]), (searchResults.value = [...data.value]))
      )
      .then((isLoading.value = false));
  }

  function search(searchWord) {
    if (searchWord.length > 0) {
      const dataCopy = [...data.value];
      searchResults.value = dataCopy.filter((person) => {
        return (
          person.name.toUpperCase().includes(searchWord.toUpperCase()) ||
          person.films.some((film) =>
            film.toUpperCase().includes(searchWord.toUpperCase())
          )
        );
      });
    } else {
      searchResults.value = [...data.value];
    }
  }

  return { data, isLoading, fetchData, search, searchResults };
});
