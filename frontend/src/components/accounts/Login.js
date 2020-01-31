import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup } from "../shared/FormGroup";
import { login } from "../../actions/auth";
import { checkValidity } from "../../utilities/checkValidity";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    isSubmitBtnClicked: false,
    errors: []
  };

  fields = [];

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };
    let newErrors = checkValidity([...this.fields], [], user);
    this.setState({
      errors: newErrors
    });
    if (newErrors.length) {
      return;
    }
    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated) {
      return this.props.history.push("/");
    }
  }

  render() {
    this.fields = [];
    let similarFormEntries = [["username", "input"], ["password", "password"]];
    similarFormEntries.forEach(([entry, type]) => {
      let error = this.state.errors.filter(error => {
        return Object.keys(error)[0] === entry;
      });

      let field = {
        control: "input",
        label: entry.charAt(0).toLocaleUpperCase() + entry.slice(1),
        attr: {
          type: type,
          className: error[0] ? "form-control is-invalid" : "form-control",
          id: entry,
          "aria-describedby": `${entry}Help`,
          placeholder:
            entry === "password2" ? "Confirm password" : `Enter ${entry}`
        },
        value: this.state[entry],
        onChange: this.handleChange,
        error: error[0] ? error[0][entry] : ""
      };

      this.fields.push(field);
    });

    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={this.handleSubmit}>
            {this.fields.map((field, index) => (
              <FormGroup key={index} {...field} />
            ))}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// export default login;
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
