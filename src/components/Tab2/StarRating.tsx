import React, { useState } from "react";
import styles from "./style.module.css"

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5]?.map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? `${styles.filled}` : ""}`}
          onClick={() => setRating(star)}
        >
          &#9734;
          {/* unicode for hollow star */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
