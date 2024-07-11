import React, { useState, useEffect } from 'react';
import { Card } from './components/Card.jsx';
import { ApiCard } from './components/ApiCard.jsx';
import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import style from './App.module.css';
import MapDisplay from './components/Map';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Invalid from './components/Invalid';


function App() {
  const [show, setShow] = useState("prod");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const dataGraph = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 50, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 500, pv: 2400, amt: 2400 },
    { name: 'Page D', uv: 120, pv: 2400, amt: 2400 },
    { name: 'Page E', uv: 10, pv: 2400, amt: 2400 },
    { name: 'Page F', uv: 1, pv: 2400, amt: 2400 }
  ];

  const dataA = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/character/?page=${page}&name=${name}`);
        setData(response.data.results || []);
      } catch (error) {
        setError(true); 
        // setData([]);
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
                return (
                  <div className={style.cardDiv}>
                    <Card
                      name={item.name}
                      desc={item.desc}
                      value={item.value}
                      image={item.image}
                      key={item.id}
                      status={item.status} />
                  </div>
                )
              })}
            </div>
          </>
        )}
        {error && (
          <>
            <Invalid></Invalid>
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
                <div key={item.id} className={style.cardDiv}>
                  <ApiCard
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
              <MapDisplay />
            </div>
          </>
        )}
        {show === "graph" && (
          <>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', width: '100%' }}>
              <h2>Gráficos</h2>
              <LineChart width={1905} height={800} data={dataGraph} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>


              <div style={{ display: 'flex', flexDirection: "column"}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                  <h4>A demo of synchronized AreaCharts</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={dataA}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div>

                  <p>Maybe some other content</p>

                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={dataA}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>

        )}
      </div>
    </>
  );
}

export default App;
