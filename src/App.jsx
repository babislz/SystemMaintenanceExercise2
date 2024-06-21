import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { ApiCard } from './components/ApiCard';
import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import style from './App.module.css';
import MapDisplay from './components/Map';

function App() {
  const [show, setShow] = useState("prod");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (name.trim() !== "") {
          response = await api.get(`/character/?name=${name}`);
        } else {
          response = await api.get(`/character/?page=${page}`);
        }
        setData(response.data.results || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [page, name]);

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" && (
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.productList}>
              {produtos.map((item) => (
                <Card
                  key={item.id}
                  category={item.categoria}
                  status={item.status}
                  title={item.name}
                  description={item.desc}
                  value={item.value}
                  imageUrl={item.image}
                />
              ))}
            </div>
          </>
        )}
        {show === "api" && (
          <>
            <h2>Rick and Morty API</h2>
            <div className={style.search_bar}>
              <input
                type="number"
                placeholder="1/43"
                value={page}
                onChange={(event) => setPage(event.target.value)}
              />
              <input
                type="text"
                placeholder="Pesquisar por nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className={style.productList}>
              {data.map((item) => (
                <ApiCard
                  key={item.id}
                  name={item.name}
                  species={item.species}
                  gender={item.gender}
                  status={item.status}
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}
        {show === "map" && (
          <>
            <h2>Mapa</h2>
            <div className={style.mapContainer}>
              <MapDisplay />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
