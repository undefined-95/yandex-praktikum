//Можно лучше: Импорты должны быть упорядочены.
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

export const ProtectedUnauthorizedRoute: FC<RouteProps> = ({
  children,
  ...rest
}) => {
  //Необхимо исправить: Нужно задать конкретную тепизацию.
  const { name } = useSelector((state: any) => state.user);

  return (
    <Route {...rest} render={() => (!name ? children : <Redirect to="/" />)} />
  );
};
