import React from "react";
import styles from "./spinner.module.css";
import vector1 from "../../images/vector1.svg";
import vector2 from "../../images/vector2.svg";
import vector3 from "../../images/vector3.svg";

function Spinner() {
  return (
    <div className={styles.spinnerBackground}>
      <div className={styles.spinnerContainer}>
        {/*Можно лучше: Рекомендую соблюдать регистр*/}
        <img src={vector1} className={styles.rotate} alt="загрузка" />
        <img src={vector2} className={styles.rotate1} alt="Ждите" />
        <img src={vector3} className={styles.rotate2} alt="загрузка" />
      </div>
    </div>
  );
}

export default Spinner;
