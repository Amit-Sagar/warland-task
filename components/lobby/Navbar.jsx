import React, { useState } from "react";
import Image from "next/image";
import infoIcon from "../../public/info.svg";
import volumeIcon from "../../public/volume.webp";
import soundOnIcon from "../../public/sound-on-icon.webp";
import Button from "@/components/common/Button";
import { useWindowSize } from "@/utils/hooks/useWindowSize";

const Navbar = ({ styles }) => {
  const [isSound, setIsSound] = useState(false);
  const widowSize = useWindowSize();
  const isSmallScreen = widowSize.width < 600;
  return (
    <div>
      <Button
        label={<Image src={infoIcon} alt="/info" />}
        classes={`${styles.infoBtn} ${
          !!isSmallScreen ? "left-5" : "left-16 "
        }  h-45 w-50 fixed top-5  z-100 flex-center`}
      />
      <div
        className={`fixed top-5 z-100 flex justify-between gap-5 w-115 relative ${
          !!isSmallScreen ? "right-5" : "right-16 "
        }`}
      >
        <Button
          classes={`${styles.grayBtn}  h-45 w-50 flex-center relative`}
          label="En"
        />
        <Button
          classes={`${styles.yellowBtn} h-45 w-50 flex-center relative`}
          label={
            <Image
              src={isSound ? soundOnIcon : volumeIcon}
              alt="/info"
              className="h-20 w-25"
            />
          }
          onClick={() => {
            setIsSound(!isSound);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
