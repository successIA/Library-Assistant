import axios from "axios";

import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from "./types";

export const getBooks = () => {
  return dispatch => {
    axios
      .get("http://127.0.0.1:8000")
      .then(res => {
        dispatch({ type: GET_BOOKS, payload: res.data });
      })
      .catch(err =>
        console.log("There was an error fetching books from the server")
      );
  };
};

export const getBook = id => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/${id}`)
      .then(res => {
        dispatch({ type: GET_BOOK, payload: res.data });
      })
      .catch(err =>
        console.log("There was an error fetching book from the server")
      );
  };
};

export const addBook = book => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/books/", book)
      .then(res => {
        dispatch({ type: ADD_BOOK, payload: res.data });
      })
      .catch(err => {
        console.log("There was an error adding book from the server");
      });
  };
};

export const updateBook = book => {
  console.log("update action: ");

  console.log(book);
  return dispatch => {
    axios
      .put(`http://127.0.0.1:8000/${book.id}`, book)
      .then(res => {
        dispatch({ type: UPDATE_BOOK, payload: res.data });
      })
      .catch(err => {
        console.log("There was an error updatin book from the server");
      });
  };
};

export const deleteBook = id => {
  return dispatch => {
    axios
      .delete(`http://127.0.0.1:8000/${id}`)
      .then(res => {
        dispatch({ type: DELETE_BOOK, payload: id });
      })
      .catch(err => {
        console.log("There was an error deleting book from the server");
      });
  };
};
