import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./total.module.css";

const Total: FC<{ sum: number }> = ({ sum }) => {
  return (
    <div className={`pr-3 ${styles.total}`}>
      <span className={`text text_type_digits-default pr-1  ${styles.digits}`}>
        {sum}
      </span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Total;
