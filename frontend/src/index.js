import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Book from "./components/Book";
import Navbar from "./components/Navbar";
import BookTable from "./components/BookTable";
import AddBook from "./components/AddBook";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />

      <div className="container">
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/books/:book_id" component={Book} />
          <Route exact path="/admin/books" component={BookTable} />
          <Route exact path="/admin/books/:book_id/edit" component={AddBook} />
          <Route exact path="/admin/books/add" component={AddBook} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
