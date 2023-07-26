import React, { useState } from "react";
import styles from "./input.module.scss";
import dropArrow from "../../public/drop-arrow.svg";
import Image from "next/image";

const Select = ({ containerClass, options, value, name, onChange }) => {
  const [openDropDown, setOpenDropdown] = useState(false);
  const handleSelect = (val) => {
    const values = { target: { name: name, value: val } };
    onChange(values);
    setOpenDropdown(false);
  };
  return (
    <div className="w-220 relative">
      <div
        className={`minh-40 w-220  ${containerClass} ${styles.inputContainer} ${
          openDropDown && "bg-black"
        }`}
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
      >
        <div className="flex-center w-full mt-1">
          <div className="w-80p text-center c-white mt-1 ml-3">{value}</div>
          <Image src={dropArrow} alt="/" />
        </div>
        {!!openDropDown && (
          <div className={`absolute bg-black z-100 ${styles.selectDropdown}`}>
            {options?.map((item, i) => (
              <div
                className={` w-91p ${styles.option}`}
                key={item + i}
                onClick={() => handleSelect(item)}
              >
                <p className="text-center"> {item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
