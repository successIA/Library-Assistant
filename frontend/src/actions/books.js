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
    const data = appendToFormData(book);
    axios
      .post("http://127.0.0.1:8000/books/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log("addBook");
        console.log(res.data);
        dispatch({ type: ADD_BOOK, payload: res.data });
      })
      .catch(err => {
        console.log("There was an error adding book from the server");
      });
  };
};

export const updateBook = book => {
  return dispatch => {
    const data = appendToFormData(book);
    axios
      .put(`http://127.0.0.1:8000/${book.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
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

const appendToFormData = book => {
  const data = new FormData();
  for (let [key, value] of Object.entries(book)) {
    // Only empty string can be used as value for an image field
    // if the user did not change or add an image to the form.
    if (key === "image" && !value) {
      data.append(key, "");
    } else if (
      key === "image" &&
      value &&
      value.type &&
      value.type.split("/")[0] === "image"
    ) {
      data.append(key, value);
    } else {
      data.append(key, value);
    }
  }
  return data;
};
