import React from "react";

const ListErrors = ({ errors }) => {
  if (errors) {
    return (
      <ul className="error-messages">
        {Object.keys(errors).map((key) => (
          <li key={key}>
            {key}
            {errors[key]}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};
export default ListErrors;
