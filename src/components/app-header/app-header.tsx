//Можно лучше: Импорты должны быть упорядочены.
import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import logo from "../../images/logo.svg";
import burger from "../../images/burger.svg";
import { NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {
  const [userName, setUserName] = React.useState<String>("");
  const location = useLocation();

  //Необходимо исправить: Нужно добавить пустой массив в зависимость.
  React.useEffect(() => {
    const currentUserName = localStorage.getItem("userName");
    setUserName(currentUserName || "");
  });

  return (
    <header className={styles.header}>
      <div className={`p-2 ${styles.header_content}`}>
        <nav className={styles.nav}>
          <NavLink
            activeClassName={styles.link_active}
            className={styles.link_inactive}
            exact={true}
            to={"/"}
          >
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
            <span className="text text_type_main-default ml-1 mr-8">
              Конструктор
            </span>
          </NavLink>
          <NavLink
            activeClassName={styles.link_active}
            className={styles.link_inactive}
            exact={true}
            to={"/feed"}
          >
            <ListIcon
              type={location.pathname === "/feed" ? "primary" : "secondary"}
            />
            <span className="text text_type_main-default ml-1">
              Лента заказов
            </span>
          </NavLink>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          activeClassName={styles.link_active}
          className={styles.profile}
          to={"/login"}
        >
          <ProfileIcon
            type={location.pathname === "/profile" ? "primary" : "secondary"}
          />
          <span className="text text_type_main-default ml-1">
            {userName ? userName : "Личный кабинет"}
          </span>
        </NavLink>
        <img src={logo} className={styles.logo_small} alt="small logo" />
        <img src={burger} className={styles.logo_small} alt="menu" />
      </div>
    </header>
  );
};
export default AppHeader;
