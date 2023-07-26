import Image from "next/image";
import React from "react";
import profile from "../../public/profileFrame.webp";
import Button from "../common/Button";
import Input from "../common/Input";
import editIcon from "../../public/edit-icon.png";

const LeftContainer = ({ styles }) => {
  return (
    <div className="flex-column justify-center items-center gap-20 px-16 py-18 flex-1">
      <div className="flex-column gap-5 font-oswald justify-center items-center">
        <Input
          icon={editIcon}
          placeholder="NAME"
          type="text"
          containerClass="w-170"
        />
        <Image src={profile} className={`w-170 h-165 mt-1`} />
        <p>TICKETS BALANCE : 00</p>
      </div>
      <div className="flex-column justify-center items-center">
        <Button
          label="+"
          classes={`${styles.withdrawBtn} flex-center relative h-30 w-45 border-b-none`}
        />
        <Button
          label="WITHDRAW 0 TICKETS"
          classes={`${styles.withdrawBtn} flex-center relative h-45 w-210 fs-18 font-oswald`}
        />
        <Button
          label="-"
          classes={`${styles.withdrawBtn} flex-center relative h-30 w-45  border-t-none`}
        />
      </div>
      <Button
        label="HISTORIC"
        classes={`${styles.redBtn} flex-center relative h-45 w-210 fs-18 font-oswald`}
      />
      <Button
        label="LEADERBOARD"
        classes={`${styles.redBtn} flex-center relative h-45 w-210 fs-18 font-oswald`}
      />
      <Button
        label="DISCONNECT"
        classes={`${styles.grayBtn} flex-center relative h-45 w-210 fs-24 font-oswald`}
      />
    </div>
  );
};

export default LeftContainer;
