"use client";

import Title from "./atoms/Title.jsx";
import { useEffect, useState } from "react";
import { getAPI } from "./services/getApi.js";

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export default function Home() {
  const [number, setNumber] = useState()
  const [page, setPage] = useState(0)
  const [loadingList, setLoadingList] = useState(true)
  const [listPokemons, setListPokemons] = useState([])
  const limit = 15
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    getPokemons()
  }, [page])

  const counter = () => {
    console.log('hola')
    setLoadingList(true)
    setPage((prev) => prev+1)
  }

  const getPokemons = async () => {
    const res = await getAPI(API_URL, {
      params: {
        limit,
        offset: limit * page
      }
    })
    if (res) {
      setLoadingList(false)
      console.log(res.data)
      setListPokemons(res.data)
    }

  }

  const handleChange = async (e) => {
    console.log(e.target.value)
    const data = await getAPI(API_URL + `/${e.target.value}`)
    if (data) {
      setPokemonData(data.data)
      console.log(data.data)
    }
    setNumber(e.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Title text={"Cambiar Pokemon con componente"}></Title>

      <input
        className="rounded border-primary"
        type="text"
        placeholder="hola"
        onChange={handleChange}
      />
      {
        pokemonData
          ?
          <div className="text-4xl">
            <img className="w-[140px] h-[140px]" src={pokemonData?.sprites?.front_default} alt="" />
            {pokemonData.name}
            
          </div>
          :
          <div>
            Todavía no hay pokemon
          </div>
      }

      <div>
        Lista de pokemones 
        <div className="flex gap-4 items-center">
          <button className="border-1 rounded p-2 bg-primary text-white">-</button>
          {page}
          <button className="border-1 rounded p-2 bg-primary text-white" onClick={()=>counter()}>+</button>
        </div>
        {
          loadingList ?
            <div>
              Cargando...
            </div>
            : listPokemons &&
            listPokemons.results.map((pokemon, index) => (
              <div key={'pokemon' + index}>
                {pokemon.name}
              </div>
            )
            )
        }
      </div>
    </main>
  );
}
