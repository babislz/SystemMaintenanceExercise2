import React from 'react';
import style from './Card.module.css';

export const Card = (props) => {
  return(
      <div>
          <h1>{props.name}</h1>
          <h2>{props.desc}</h2>
          <p>{props.value}</p>
          <div className={style.statusClass} style={{backgroundColor: props.status?"green":"red"}}></div>
          <img src={props.image} alt={props.name}/>
      </div>
  )
}

