//Можно лучше: Импорты должны быть упорядочены.
import React, { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";

//Необхимо исправить: Нужно задать конкретную тепизацию.
const Card: FC<{ item: TIngredient }> = ({ item }) => {
  const getCounter = (state: any) => {
    return state.constructorIngredients.reduce(
      (acc: any, el: any) => (el._id === item._id ? ++acc : acc),
      0
    );
  };

  // Необхимо исправить: Нужно задать конкретную тепизацию.
  const counter = useSelector((state: any) =>
    getCounter(state.constructorIngredients)
  );

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: { ...item, key: uuidv4() },
  });

  return (
    <div>
      <li className={`pl-3 pb-8 ${styles.card}`} ref={dragRef} data-cy="card">
        {/*Можно лучше: Рекомендую использовать "Логическое и"*/}
        {counter > 0 ? <Counter count={counter} size="small" /> : null}
        <img src={item.image} alt={item.name} />
        <span className={`text text_type_digits-default pr-1 ${styles.price}`}>
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
        <p className="text text_type_main-default">{item.name}</p>
      </li>
    </div>
  );
};

export default Card;
