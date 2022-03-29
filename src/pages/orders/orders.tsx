//Можно лучше: Импорты должны быть упорядочены.
import React, { useEffect } from "react";
import styles from "./orders.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersInfo from "../../components/orders-info/orders-info";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from "../../services/actions/ws";
import { useDispatch, useSelector } from "react-redux";
import { wsUrl } from "../../utils/constant";

export function Orders() {
  const dispatch = useDispatch();
  //Необхимо исправить: Нужно задать конкретную тепизацию.
  const orders = useSelector((state: any) => state.ws.orders);

  useEffect(() => {
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsUrl,
    });
    return;
  }, []);

  if (orders.length > 0) {
    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <h2
            className={`text text_type_main-large pl-2 pr-2 pb-5 pt-10 ${styles.header}`}
          >
            Лента заказов
          </h2>
          <section className={`p-2 ${styles.section}`}>
            <OrdersList orders={orders} />
          </section>
          <OrdersInfo />
        </div>
      </div>
    );
  } else return null; //Можно лучше Неправильно вернуть null, else лучше не писать
}
