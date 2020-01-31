import React from "react";

export const FormGroup = props => {
  switch (props.control) {
    case "textarea":
      return (
        <div className="form-group">
          <label htmlFor={props.id}>{props.label}</label>
          <textarea
            {...props.attr}
            value={props.value}
            onChange={props.onChange}
          />
          {props.error ? (
            <span style={{ color: "#DC3545" }}>{props.error}</span>
          ) : (
            ""
          )}
        </div>
      );
    default:
      return (
        <div className="form-group">
          <label htmlFor={props.id}>{props.label}</label>
          <input
            {...props.attr}
            value={props.value}
            onChange={props.onChange}
          />
          {props.error ? (
            <span style={{ color: "#DC3545" }}>{props.error}</span>
          ) : (
            ""
          )}
        </div>
      );
  }
};
