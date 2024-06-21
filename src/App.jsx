import React, { useState, useEffect } from 'react';
import { Card } from './components/Card.jsx';
import { ApiCard } from './components/ApiCard.jsx';
import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import style from './App.module.css';
import MapDisplay from './components/Map';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


function App() {
  const [show, setShow] = useState("prod");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const dataGraph = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

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
        <button onClick={() => setShow("graph")}>Gráficos</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" && (
          <>
          <h2>Showroom de produtos</h2>
            <div className={style.cardShows}>
            {produtos.map((item) => {
              return(
                <div className={style.cardDiv}>
                  <Card 
                    name={item.name} 
                    desc={item.desc} 
                    value={item.value} 
                    image={item.image} 
                    key={item.id} 
                    status={item.status}/>
                </div>
              )
             })}
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
            <div className={style.cardShows}>
              {data.map((item) => (
                <div className={style.cardDiv}>
                  <ApiCard
                    key={item.id}
                    name={item.name}
                    species={item.species}
                    type={item.type}
                    gender={item.gender}
                    status={item.status}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {show === "map" && (
          <>
            <h2>Mapa</h2>
            <div className={style.mapContainer}>
              <MapDisplay/>
            </div>
          </>
        )}
        {show === "graph" && (
          <>
            <h2>Gráficos</h2>
            <LineChart width={1850} height={800} data={dataGraph} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </>
        )}
      </div>
    </>
  );
}

export default App;
