import React from "react";
import style from './Invalid.module.css';

const Invalid = () => {
  return (
    <div className={style.background}>
        <div className={style.modalzinho}>
            <h3>Input Inválido</h3>
            <div className="closeX">
                <span class="material-symbols-outlined">close</span>
            </div>
        </div>
    </div>
  );
};

export default Invalid;
