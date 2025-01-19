import axios from "axios";

export const PokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  method: "GET",
});
