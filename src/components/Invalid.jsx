import React from "react";
import style from './Invalid.module.css';

const Invalid = ({setError}) => {
  return (
    <div className={style.background}>
        <div className={style.modal}>
          <h2>Nome Inválido</h2>
          <p>Favor inserir um nome válido para que a busca possa ser realizada.</p>
          <button onClick={() => {setError(false)}} className={style.btn} aria-label="Fechar modal">X</button>
        </div>
    </div>
  );
};

export default Invalid;
