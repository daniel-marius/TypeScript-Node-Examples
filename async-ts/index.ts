import { getPokemonList, getPokemon, getFirstPokemon } from "./src/getPokemon";

import PromisePool from "@supercharge/promise-pool";

(async function() {
  try {
    // const list = await getPokemonList();
    // const pokemon = await getPokemon(list.results[0].url);
    // console.log(pokemon.stats);

    // const pokemon = getFirstPokemon();
    // console.log(pokemon);

    // Promise as a cache
    // const pokemonPromise = getFirstPokemon();

    // const pokemon = await pokemonPromise;
    // console.log(pokemon.name);
    // const pokemon2 = await pokemonPromise;
    // console.log(pokemon2.name);

    //Async looping
    //const list = await getPokemonList();
    //for (const listItem of list.results) {
    //	const pokemon = await getPokemon(listItem.url);
    //	console.log(pokemon.name);
    //});

    //Async looping
    //list.results.reduce<Promise<unknown>>(async (prm, pokemon) => {
    //	await prm;
    //	return getPokemon(pokemon.url).then((p) => console.log(p.name));
    //}, Promise.resolve(undefined));

    //const data = await Promise.all(list.results.slice(0, 5).map((pokemon) => getPokemon(pokemon.url)));
    //console.log(">> DONE");

    const list = await getPokemonList();

    const { results, errors } = await PromisePool.withConcurrency(2)
      .for(list.results)
      .process(async data => {
        return await getPokemon(data.url);
      });
    console.log(results.map(p => p.name));
  } catch (e) {
    console.error(e);
  }
})();
