//Можно лучше: Импорты должны быть упорядочены и убрать лишние импорты.
import React, { useEffect, useState, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./order-list.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import OrderStatus from "../order-status/order-status";
import { formatDate } from "../../utils/utils";
import { TIngredient } from "../../utils/types";

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  ingredientsInfo: TIngredient[];
  _id: string;
};

export type TOrders = { orders: TOrder[] };

type TOrderCard = {
  orderNumber: number;
  date: string;
  name: string;
  status: string;
  orderIngredients: TIngredient[];
  path: string;
};

// Можно лучше: Рекомендую всегда указывать типизацию
const OrderCard: FC<TOrderCard> = ({
  orderNumber,
  date,
  name,
  status,
  orderIngredients,
  path,
}) => {
  const [ingredientsToShow, setIngredientsToShow] = useState<TIngredient[]>([]);
  const [total, setTotal] = useState(0);
  const [remains, setRemains] = useState<number>(0);
  const [orderDate, setOrderDate] = useState("");

  const maxIngredients = 6;

  useEffect(() => {
    if (orderIngredients && orderIngredients.length > 0) {
      const sum = orderIngredients
        .filter(Boolean)
        .reduce(
          (acc, element) =>
            element.type === "bun"
              ? (acc += element.price * 2)
              : (acc += element.price),
          0
        );
      setTotal(sum);
      const remainsTotal =
        orderIngredients.length > maxIngredients
          ? orderIngredients.length - maxIngredients
          : 0;
      setRemains(remainsTotal);
      setIngredientsToShow(orderIngredients.slice(0, maxIngredients));
      setOrderDate(formatDate(date));
    }
  }, [date, orderIngredients]);

  if (ingredientsToShow.length > 0) {
    return (
      <div>
        <div className={`p-6 mb-4 mr-2 ${styles.order}`}>
          <div className={styles.order_info}>
            <span className={`text text_type_digits-default ${styles.number}`}>
              #{orderNumber}
            </span>
            <span className="text text_type_main-default text_color_inactive">
              {orderDate}
            </span>
          </div>
          <h4
            className={`pt-6 text text_type_main-medium ${styles.order_name}`}
          >
            {name}
          </h4>
          {path === "/profile/orders" && <OrderStatus status={status} />}
          <div className={`pt-6 ${styles.order_content}`}>
            <ul className={styles.ingredients}>
              {/*Необхимо исправить: Нужно задать конкретную тепизацию.*/}
              {ingredientsToShow.map((ingredient: any, index: number) => {
                let zIndex = maxIngredients - index;
                let right = 20 * index;
                return (
                  ingredient && (
                    <li
                      className={styles.img_wrap}
                      style={{ zIndex: zIndex, right: right }}
                      key={index}
                    >
                      <img
                        style={{
                          opacity:
                            remains && maxIngredients === index + 1
                              ? "0.5"
                              : "1",
                        }}
                        className={styles.img}
                        src={ingredient.image_mobile}
                        alt={ingredient.name}
                      />
                      {/*Можно лучше: Рекомендую использовать "логическое и"*/}
                      {maxIngredients === index + 1 ? (
                        <span
                          className={`text text_type_digits-default ${styles.remains}`}
                        >
                          {remains > 0 ? `+${remains}` : null}
                        </span>
                      ) : null}
                    </li>
                  )
                );
              })}
            </ul>
            <div>
              <span
                className={`text text_type_digits-default pr-1 ${styles.order_total}`}
              >
                {total}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  } else return null; //Необходимо исправить: не рекомендуется вернуть null, можно просто не писать else в таком случае
};

const OrdersList: FC<TOrders> = ({ orders }) => {
  const location = useLocation();
  const [ordersWithFullInfo, setOrdersWithFullInfo] = useState<TOrder[]>();
  {
    /*Необхимо исправить: Нужно задать конкретную тепизацию.*/
  }
  const { ingredients } = useSelector((state: any) => state.burgerIngredients);

  useEffect(() => {
    if (ingredients.length > 0 && orders.length > 0) {
      orders.map((el) => {
        let ingredientInfo: TIngredient;
        const ingredientArray: TIngredient[] = [];
        el.ingredients.forEach((ing) => {
          ingredientInfo = ingredients.find(
            (ingredient: TIngredient) => ingredient._id === ing
          );
          ingredientArray.push(ingredientInfo);
        });
        el.ingredientsInfo = ingredientArray;
      });
      setOrdersWithFullInfo(orders);
    }
  }, [ingredients, orders, ordersWithFullInfo, location]);

  return (
    <>
      {/*Можно лучше: Рекомендую использовать "Логическое и"*/}
      {ordersWithFullInfo && ordersWithFullInfo.length > 0 ? (
        <div className={`mt-10 ${styles.content}`}>
          {ordersWithFullInfo.map((order: TOrder, index: number) => {
            return (
              <OrderCard
                orderNumber={order.number}
                date={order.createdAt}
                name={order.name}
                status={order.status}
                orderIngredients={order.ingredientsInfo}
                path={location.pathname}
                key={order.number}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default OrdersList;
