import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import BookList from "./components/BookList";
import Book from "./components/Book";
import Navbar from "./components/Navbar";
import BookTable from "./components/BookTable";
import AddBook from "./components/AddBook";
import Alert from "./components/shared/Alert";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Alert />
      <div className="container">
        <Switch>
          <Route exact path="/" component={BookList} />
          {/* <Route exact path="/books" component={BookList} /> */}
          <Route exact path="/admin/books" component={BookTable} />
          <Route exact path="/admin/books/add" component={AddBook} />

          <Route exact path="/books/:book_id" component={Book} />
          <Route exact path="/admin/books/:book_id/edit" component={AddBook} />

          <Route exact path="/auth/register" component={Register} />
          <Route exact path="/auth/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
