import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup } from "../shared/FormGroup";
import { register } from "../../actions/auth";
import { message } from "../../actions/messages";
import { checkValidity } from "../../utilities/checkValidity";
import { emailValidator } from "../../utilities/validators";

export class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    email: "",
    isSubmitBtnClicked: false,
    errors: []
  };

  fields = [];

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated) {
      return this.props.history.push("/");
    }
  }

  handleChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        if (this.state.isSubmitBtnClicked) {
          this.getFormErrors();
        }
      }
    );
  };

  getFormErrors = () => {
    const { username, password, password2, email } = this.state;
    const user = { username, password, password2, email };
    let errors = [];
    if (this.state.password2 && this.state.password !== this.state.password2) {
      errors = [{ password2: "Passwords do not match" }];
    }
    let newErrors = checkValidity([...this.fields], errors, user);
    this.setState({
      errors: newErrors
    });
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, email } = this.state;
    const user = { username, password, email };
    this.setState({
      isSubmitBtnClicked: true
    });
    if (this.getFormErrors().length) {
      return;
    }
    this.props.register(user);
  };

  render() {
    this.fields = [];

    // entry, type, label, rule
    let similarFormEntries = [
      ["username", "text", "Username", { minLength: 2, maxLength: 16 }],
      ["password", "password", "Password", { minLength: 8 }],
      ["password2", "password", "Confirm Password"],
      ["email", "email", "Email", { validator: emailValidator }]
    ];

    similarFormEntries.forEach(([id, type, label, rule]) => {
      let error = this.state.errors.filter(error => {
        return Object.keys(error)[0] === id;
      });

      let field = {
        control: "input",
        label,
        attr: {
          type,
          id: id,
          "aria-describedby": `${id}Help`,
          placeholder: id === "password2" ? "Confirm password" : `Enter ${id}`,
          className: !this.state.isSubmitBtnClicked
            ? "form-control"
            : error[0]
            ? "form-control is-invalid"
            : "form-control is-valid"
        },
        rule,
        error: error[0] ? error[0][id] : "",
        value: this.state[id],
        onChange: this.handleChange
      };

      this.fields.push(field);
    });

    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Register</h2>
          <form onSubmit={this.handleSubmit}>
            {this.fields.map((field, index) => (
              <FormGroup key={index} {...field} />
            ))}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, message }
)(Register);
