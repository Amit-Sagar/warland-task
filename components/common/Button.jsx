import React from "react";


const Button = ({ label, classes, onClick }) => {
  return (
    <div className={classes} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
