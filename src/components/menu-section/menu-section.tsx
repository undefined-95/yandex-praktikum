//Можно лучше: Импорты должны быть упорядочены.
import React, { FC } from "react";
import styles from "../menu-section/menu-section.module.css";
import Card from "../card/card";
import { useSelector } from "react-redux";
import { TIngredient } from "../../utils/types";

//Необхимо исправить: Нужно задать конкретную тепизацию.
const MenuSection: FC<{
  title: any;
  type: string;
  customRef: (node?: Element | null | undefined) => void;
}> = ({ title, type, customRef }) => {
  const { ingredients } = useSelector((state: any) => state.burgerIngredients);

  return (
    <div>
      <h3
        id={type}
        className={`text text_type_main-medium  pb-5 pt-5 ${styles.header}`}
      >
        {title}
      </h3>
      {ingredients && (
        <ul className={styles.cards} ref={customRef}>
          {ingredients
            .filter((item: TIngredient) => item.type === type)
            .map((item: TIngredient) => (
              <Card item={item} key={item._id} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default MenuSection;
