import React, { FC } from "react";
import styles from "./order-details.module.css";
import vector1 from "../../images/vector1.svg";
import vector2 from "../../images/vector2.svg";
import vector3 from "../../images/vector3.svg";
import checkmark from "../../images/checkmark.svg";

const OrderDetails: FC<{ order: string }> = ({ order }) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large pb-5">{order}</p>
      <p className="text text_type_main-default pb-5">идентификатор заказа</p>
      <div className={styles.imageContainer}>
        <img src={vector1} className={styles.rotate} alt="Заказ принят" />
        <img src={vector2} className={styles.rotate1} alt="Заказ принят" />
        <img src={vector3} className={styles.rotate2} alt="Заказ принят" />
        <img src={checkmark} className={styles.checkmark} alt="Заказ принят" />
      </div>
      <p className="text text_type_main-small pb-3 pt-5">
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-small pb-5' ${styles.color}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
