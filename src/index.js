//Надо исправить: Необходимо исправить расширение документа на tsx.
//Можно лучше: Импорты должны быть упорядочены.
import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import "./fonts/fonts.css";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import thunk from "redux-thunk";

//Надо исправить: Необходимо перенести store в отдельный файл.
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
