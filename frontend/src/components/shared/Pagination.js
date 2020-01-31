import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ page, currentPageNum, url }) => {
  const pageLength = Math.ceil(page.count / 3);
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li
          aria-disabled="true"
          tabIndex="-1"
          className={page.previous ? "page-item" : "page-item disabled"}
        >
          <Link className="page-link" to={page.previous ? page.previous : "#"}>
            Previous
          </Link>
        </li>
        {[...Array(pageLength)].map((el, i) => {
          let index = parseInt(i + 1);
          return (
            <li
              key={index}
              className={
                currentPageNum === index ? "page-item active" : "page-item"
              }
            >
              <Link className="page-link" to={`${url}${index}`}>
                {index}
                {currentPageNum === index ? (
                  <span className="sr-only">(current)</span>
                ) : (
                  ""
                )}
              </Link>
            </li>
          );
        })}
        <li className={page.next ? "page-item" : "page-item disabled"}>
          <Link
            aria-disabled="true"
            tabIndex="-1"
            className="page-link"
            to={page.next ? page.next : "#"}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
