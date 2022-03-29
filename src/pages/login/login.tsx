//Можно лучше: Импорты должны быть упорядочены.
import React, { useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../common.module.css";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/actions/user";

type TFrom = {
  from: {
    pathname: string;
  };
};

export function Login() {
  const dispatch = useDispatch();
  const location = useLocation<TFrom>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Необхимо исправить: Нужно задать конкретную тепизацию.
  const { name, loginUserError } = useSelector((state: any) => state.user);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    setEmail("");
    setPassword("");
  };

  if (name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <div className={`pt-30 ${styles.wrap}`}>
      <h3 className={`pb-6 ${styles.title}`}>Вход</h3>
      <form
        className={`pb-20 ${styles.form}`}
        name="login"
        onSubmit={handleSubmit}
      >
        <div className="pb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            // Можно лучше: Рекомендую писать Хендлеры
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            errorText={""}
            size={"default"}
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
          />
        </div>
        <span className={`pb-40 ${styles.button}`}>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </span>
      </form>
      {/*Можно лучше: Рекомендую использовать "Логическое и"*/}
      {loginUserError ? (
        <p className="pt-5 text text_type_main-default">{loginUserError}</p>
      ) : null}
    </div>
  );
}
