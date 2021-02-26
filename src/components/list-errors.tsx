import React from "react";

import * as Types from "../reducers/types";

export interface ListErrorsProps {
  errors?: Types.Errors;
}

const ListErrors: React.FC<ListErrorsProps> = ({ errors }) => {
  if (errors) {
    return (
      <ul className="error-messages">
        {Object.keys(errors).map((key) => (
          <li key={key}>
            {key}
            &nbsp;
            {errors[key]}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};
export default ListErrors;
