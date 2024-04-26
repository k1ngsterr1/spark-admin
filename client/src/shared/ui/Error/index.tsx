import React from 'react';
import styles from './styles.module.scss'; 

interface IMessage {
    message: string;
}

export const ErrorDisplay: React.FC<IMessage> = ({ message }) => {
  if (!message) return null;
  
  return <div className={styles.error}>{message}</div>;
};

