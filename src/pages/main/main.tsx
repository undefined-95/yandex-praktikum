//Можно лучше: Импорты должны быть упорядочены.
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuIngredients } from "../../services/actions";
import {
  CREATE_ORDER,
  getNumber,
  RESET_ORDER,
} from "../../services/actions/order";

import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import styles from "./main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";

export function Main() {
  const [isOrderInvalid, setIsOrderInvalid] = useState(false);

  const dispatch = useDispatch();
  //Необхимо исправить: Нужно задать конкретную тепизацию.
  const { number, orderNumberRequest } = useSelector(
    (state: any) => state.order
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(getMenuIngredients());
  }, [isOrderInvalid, number]);

  //Необхимо исправить: Нужно задать конкретную тепизацию.
  const onOrderClick = (orderData: any, isBun: any) => {
    if (isBun) {
      dispatch({
        type: CREATE_ORDER,
        payload: orderData,
      });
      dispatch(getNumber({ ingredients: orderData }));
    } else {
      setIsOrderInvalid(true);
    }
  };

  const onCloseClick = () => {
    setIsOrderInvalid(false);
    dispatch({
      type: RESET_ORDER,
    });
    history.goBack();
  };

  const modal = (
    <Modal header={""} onClose={onCloseClick}>
      {number && <OrderDetails order={number} />}
      {isOrderInvalid && (
        <p className="text text_type_main-large pb-5">
          Добавьте булку в ваш бургер
        </p>
      )}
    </Modal>
  );

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <h1
          className={`text text_type_main-large pl-2 pr-2 pb-5 pt-10 ${styles.header}`}
        >
          Cоберите бургер
        </h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onOrderClick={onOrderClick} />
        </DndProvider>
      </main>
      {(isOrderInvalid || number) && modal}
      {orderNumberRequest && <Spinner />}
    </div>
  );
}
