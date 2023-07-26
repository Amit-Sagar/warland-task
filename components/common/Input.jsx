import Image from "next/image";
import React from "react";
import styles from "./input.module.scss";
const Input = ({
  placeholder,
  type,
  onChange,
  value,
  icon,
  containerClass,
  inputClass,
}) => {
  return (
    <div
      className={`h-40  flex-center ${containerClass} ${styles.inputContainer}`}
    >
      <input
        className={`${styles.input} ${inputClass} w-80p h-35`}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
      {icon && <Image src={icon} alt="/edit-icon" className={`h-15 w-15`} />}
    </div>
  );
};

export default Input;
