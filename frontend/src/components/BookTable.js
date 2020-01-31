import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentPageNumber } from "../utilities/getCurrentPageNumber";
import Pagination from "./shared/Pagination";

import { getAdminBooks, deleteBook } from "../actions/books";
import Modal from "./shared/Modal";
import Loader from "./shared/Loader";

export class BookTable extends Component {
  defaulModalOptionValues = {
    heading: "",
    body: "",
    actionBtnText: "",
    closeBtnText: ""
  };

  state = {
    search: "",
    shouldShowModal: false,
    bookToDeleteId: "",
    modalOptions: this.defaulModalOptionValues
  };

  componentDidMount() {
    let number = getCurrentPageNumber(this.props.location.search);
    number ? this.props.getAdminBooks(number) : this.props.getAdminBooks();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (!this.props.isAuthenticated) {
      return this.props.history.push("/");
    }
    if (!this.props.books.length && prevProps.books.length) {
      const { page } = this.props;
      // if (page.previous) {
      //   page.previous = page.previous.replace("http://127.0.0.1:8000", "");
      // }
      let page_num = Math.ceil((page.count - 1) / 3);
      this.props.history.push(`/admin/books?page=${page_num}`);
    }
    if (
      getCurrentPageNumber(this.props.location.search) !==
      getCurrentPageNumber(prevProps.location.search)
    ) {
      window.scrollTo(0, 0);
      let number = getCurrentPageNumber(this.props.location.search);
      number ? this.props.getAdminBooks(number) : this.props.getAdminBooks();
    }
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    getAdminBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
  };

  handleDelete = (id, title) => {
    this.setState({
      shouldShowModal: true,
      bookToDeleteId: id,
      modalOptions: {
        heading: "Confirm Delete",
        body: (
          <Fragment>
            Are you sure you want to delete: <strong>{title}</strong>
          </Fragment>
        ),
        actionBtnText: "Delete"
      }
    });
  };

  handleModalActionBtn = () => {
    if (this.state.bookToDeleteId) {
      this.props.deleteBook(this.state.bookToDeleteId);
      this.setState({
        shouldShowModal: false,
        bookToDeleteId: "",
        modalOptions: this.defaulModalOptionValues
      });
    }
  };

  handleModalCloseBtn = () => {
    this.setState({
      shouldShowModal: false,
      bookToDeleteId: "",
      modalOptions: this.defaulModalOptionValues
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    let { books } = this.props;
    const { page } = this.props;

    if (page.next) {
      page.next = page.next.replace("http://127.0.0.1:8000", "");
    }
    if (page.previous) {
      page.previous = page.previous.replace("http://127.0.0.1:8000", "");
    }
    let url = "/admin/books?page=";

    const currentPageNum = getCurrentPageNumber(this.props.location.search);
    if (this.state.search)
      books = books.filter(book =>
        book.title.toLowerCase().includes(this.state.search.toLowerCase())
      );
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <Modal
            shouldShow={this.state.shouldShowModal}
            handleActionBtn={this.handleModalActionBtn}
            handleCloseBtn={this.handleModalCloseBtn}
            options={this.state.modalOptions}
          />
          <h2 className="mb-4">Books</h2>
          <div className="row ml-0 mb-0 above-table">
            <Link
              to={"/admin/books/add"}
              className="btn btn-primary text-right mb-4 mr-2"
            >
              <i className="fa fa-plus mr-1"></i>
              Create New Book
            </Link>
            <form autoComplete="off" className="form-inline my-2 my-lg-0 pb-4">
              <div className="form-group row">
                <div className="col-md-12">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="All books"
                    aria-label="Search"
                    id="search"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <table className="table table-striped table-responsive mt-0 book-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
                <th scope="col">Description</th>
                <th scope="col">Length</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {books.length ? (
                books.map(book => {
                  return (
                    <tr key={book.id}>
                      <th scope="row">{book.id}</th>
                      <td>
                        <img
                          src={
                            book.image
                              ? book.image
                              : "https://via.placeholder.com/75x100"
                          }
                          className="mr-3"
                          alt={book.title + "book image"}
                          width="75"
                          height="100"
                        />
                      </td>
                      <td>
                        <Link to={"/books/" + book.id}>{book.title}</Link>
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.author}
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.publisher}
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.description.length > 100
                          ? book.description.substring(0, 100) + "..."
                          : book.description}
                      </td>
                      <td className="font-weight-light text-muted">
                        {book.num_of_pages}
                      </td>
                      <td>
                        <Link
                          className="btn btn-sm btn-secondary"
                          to={"/admin/books/" + book.id + "/edit"}
                        >
                          <i className="fa fa-edit mr-1"></i>Update
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={this.handleDelete.bind(
                            this,
                            book.id,
                            book.title
                          )}
                        >
                          <span>
                            <i
                              style={{
                                fontSize: "1em",
                                display: "inline-block"
                              }}
                              className="fa fa-trash-alt mr-1"
                            ></i>
                          </span>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>{!this.props.books.length ? <Loader /> : ""}</td>
                </tr>
              )}
            </tbody>
          </table>
          {this.props.books.length && !books.length ? (
            <p>No Search Results</p>
          ) : (
            ""
          )}
          <Pagination page={page} currentPageNum={currentPageNum} url={url} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.bookReducer.books,
    page: state.bookReducer.page,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { getAdminBooks, deleteBook }
)(BookTable);
