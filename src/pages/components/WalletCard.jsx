import React from 'react';
import styles from './WalletCard.module.css';

const WalletCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles['first-content']}>
        <span>Wallet Balance</span>
      </div>
      <div className={styles['second-content']}>
        <span>xyz YB</span>
      </div>
    </div>
  );
};

export default WalletCard;
