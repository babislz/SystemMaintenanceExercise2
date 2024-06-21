import React from 'react';
import style from './ApiCard.module.css'

export const ApiCard = (props) => {
  return(
      <div>
          <h1>{props.name}</h1>
          <h2>{props.status}</h2>
          <h3>{props.species}</h3>
          <h3>{props.type}</h3>
          <h3>{props.gender}</h3>
          <img src={props.image} alt={props.name}/>
      </div>
  )
}



