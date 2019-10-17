import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from "../actions/types";

const initialState = {
  books: [],
  book: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case GET_BOOK:
      return {
        ...state,
        // books: [...state.books].map(book =>
        //   book.id === action.payload.id ? action.payload : book
        // ),
        book: action.payload
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: [...state.books].map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
        book: action.payload
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: [...state.books].filter(book => book.id !== action.payload)
      };
    default:
      return state;
  }
};
