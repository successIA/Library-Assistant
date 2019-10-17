import React from "react";
import "./App.css";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="row mt-4">
      <div className="col-md-8 offset-md-2">
        <BookList />
      </div>
    </div>
  );
}

export default App;
