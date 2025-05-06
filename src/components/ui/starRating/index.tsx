import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const StarRating = ({ rating, setRating }) => {
  const [currRating, setCurrRating] = useState<number>(0);

  useEffect(() => {
    setCurrRating(rating);
  }, [rating]);
  
  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5]?.map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= currRating ? `${styles.filled}` : ""
            }`}
          onClick={() => {
            if (setRating) setRating(star);
            setCurrRating(star);
          }}
        >
          &#9734;
          {/* unicode for hollow star */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;