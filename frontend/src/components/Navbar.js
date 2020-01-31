/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import "./Navbar.css";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      books: []
    };

    // To be used for detecting search dropdown outside click.
    this.searchDropdownRef = React.createRef();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });

    e.target.value.length
      ? axios
          .get("http://127.0.0.1:8000/books?search=" + this.state.search)
          .then(res => {
            console.log(res.data);
            this.setState({
              books: res.data.results
            });
          })
          .catch(err => console.log("There was an searching from the server"))
      : this.setState({
          books: []
        });
  };

  /*
  May be called when the document is clicked
  */
  handleClick = e => {
    // Close the search dropdown by emptying the books in the state
    // if the click event does not contain the searchDropdownRef.
    if (
      this.searchDropdownRef.current &&
      !this.searchDropdownRef.current.contains(e.target)
    ) {
      this.setState({
        books: []
      });
    }
    // Reset the search input when a link in the dropdown
    // is clicked.
    if (e.target.className === "book-search-item") {
      this.setState({
        search: "",
        books: []
      });
    }
  };

  componentDidMount() {
    // Registering the callback used to detect clicks outside
    // the search dropdown.
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    // Registering the callback used to detect clicks outside
    // the search dropdown
    document.removeEventListener("click", this.handleClick);
  }

  render() {
    const { books } = this.state;
    const authLinks = (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/books">
            Manage Books
          </NavLink>
        </li>
        <li className="nav-item">
          <button
            className="nav-link btn btn-link btn-sm"
            onClick={this.props.logout}
          >
            Logout
          </button>
        </li>
      </>
    );
    const guestLinks = (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/auth/register">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/auth/login">
            Login
          </NavLink>
        </li>
      </>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Library Assistant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {this.props.isAuthenticated ? authLinks : guestLinks}
          </ul>
          {this.props.isAuthenticated ? (
            <span className="mr-4 text-light">
              Welcome, {this.props.user.username}
            </span>
          ) : (
            ""
          )}
          <form autoComplete="off" className="form-inline my-2 my-lg-0">
            <div ref={this.searchDropdownRef} className="search-wrapper">
              <span className="search-icon">
                <i className="fas fa-search"></i>
              </span>
              <input
                className="form-control mr-sm-2 search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="search"
                value={this.state.search}
                onChange={this.handleChange}
              />
              {books.length ? (
                <ul>
                  {books.map(book => (
                    <li key={book.id}>
                      <Link
                        className="book-search-item"
                        to={"/books/" + book.id}
                      >
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));
