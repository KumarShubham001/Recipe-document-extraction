import React from 'react';
import styles from './style.module.css';

interface PageLoaderProps {
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ className }) => {
  return (
    <div className={`${styles.loaderContainer} ${className}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default PageLoader;
