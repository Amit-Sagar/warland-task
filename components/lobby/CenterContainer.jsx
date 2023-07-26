import Image from "next/image";
import React, { useState } from "react";
import profile from "../../public/profileFrame.webp";

const CenterContainer = ({ styles }) => {
  const [currentSelected, setCurrentSelected] = useState(0);
  return (
    <div className="pt-12 px-16 pb-3 maxw-445 maxh-504 flex-center flex-decimal ">
      <div className={`${styles.centerContainer} hidden pb-4`}>
        <h3 className="fs-22 font-oswald">CHOOSE YOUR PROFILE PICTURE</h3>
        <p className="fs-18 mt-2">It does not affect your gameplay</p>

        <div className="flex-wrap justify-center pt-3 mt-2 scroll h-86p">
          {Array.apply(null, Array(50)).map((_, i) => (
            <Image
              src={profile}
              key={i}
              className={`h-65 w-65 mx-1 my-1 scale-1 ${
                i !== 0
                  ? "cursor-none opacity-half"
                  : "border-white cursor-pointer"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterContainer;
