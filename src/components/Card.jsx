import React from 'react';
import styles from './Card.module.css'; 

const Card = ({ title, description, category, value, imageUrl, isActive }) => {
  const statusClass = isActive ? styles.statusGreen : styles.statusRed;

  return (
    <div className={styles.card}>
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <h3>{category}</h3>
        <div className={styles.info}>
          <p>{value}</p>
          <div className={statusClass}></div>
        </div>
      </div>
      <img src={imageUrl} alt={title} className={styles.image} />
    </div>
  );
};

export default Card;
