import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({ book, handleDelete }) => {
  return (
    <tr key={book.id}>
      <th scope="row">{book.id}</th>
      <td>
        <img
          src={book.image ? book.image : "https://via.placeholder.com/75x100"}
          className="mr-3"
          alt={book.title + "book image"}
          width="75"
          height="100"
        />
      </td>
      <td>
        <Link to={"/books/" + book.id}>{book.title}</Link>
      </td>
      <td className="font-weight-light text-muted">{book.author}</td>
      <td className="font-weight-light text-muted">{book.publisher}</td>
      <td className="font-weight-light text-muted">
        {book.description.length > 100
          ? book.description.substring(0, 100) + "..."
          : book.description}
      </td>
      <td className="font-weight-light text-muted">{book.num_of_pages}</td>
      <td>
        <Link
          className="btn btn-sm btn-secondary"
          to={"/admin/books/" + book.id + "/edit"}
        >
          Update
        </Link>
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={handleDelete(
            // this,
            book.id,
            book.title
          )}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
