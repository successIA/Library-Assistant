import React, { Fragment } from "react";
import "./Alert.css";
import { connect } from "react-redux";

class Alert extends React.Component {
  state = {
    message: null,
    error: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.message && this.props.message !== prevProps.message) {
      this.timerID = setTimeout(() => {
        this.setState({
          message: null
        });
      }, 3000);
      this.setState({
        message: this.props.message.body
      });
    }

    if (this.props.error && this.props.error !== prevProps.error) {
      this.timerID = setTimeout(() => {
        this.setState({
          error: null
        });
      }, 4000);

      this.setState({
        error: this.props.error
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    let alertBody = "";
    let alertClass = "";
    if (this.state.message) {
      alertBody = this.props.message.body;
      alertClass = "b-alert b-alert-success";
    }
    if (this.state.error) {
      alertBody = Object.entries(this.props.error).map(([k, arrVal], index) => {
        if (Array.isArray(arrVal)) {
          return <li key={index}>{`${arrVal.join(", ")}`}</li>;
        } else {
          return <li key={index}>{arrVal}</li>;
        }
      });
      alertBody = <ul>{alertBody}</ul>;
      alertClass = "b-alert b-alert-danger";
    }

    if (this.state.message || this.state.error) {
      return (
        <div className={alertClass}>
          <span>{alertBody}</span>
        </div>
      );
    }
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  message: state.messageReducer.message,
  error: state.messageReducer.error
});

export default connect(mapStateToProps)(Alert);
