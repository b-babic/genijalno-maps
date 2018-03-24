import React from "react";

const Input = ({ error, ...rest }) => (
  <div>
    <input error={error} {...rest} />
    {error && <div>{error}</div>}
  </div>
);

export default Input;
