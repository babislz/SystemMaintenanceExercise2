import React from 'react';
import styles from '../ApiCard.module.css';

const ApiCard = ({ name, species, gender, status, image }) => {
  const statusClass = status ? styles.statusGreen : styles.statusRed;

  return (
    <div className={styles.apiCard}>
      <div>
        <h1>{name}</h1>
      </div>
      <div className={styles.info}>
        <p>{species}</p>
        <p>{gender}</p>
        <div className={statusClass}></div>
      </div>
      <img src={image} alt={name} className={styles.image} />
    </div>
  );
};

export default ApiCard;
