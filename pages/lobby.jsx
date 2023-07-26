import React from "react";
import styles from "../styles/Lobby.module.scss";
import Navbar from "@/components/lobby/Navbar";
import LeftContainer from "@/components/lobby/LeftContainer";
import CenterContainer from "@/components/lobby/CenterContainer";
import RightContainer from "@/components/lobby/RightContainer";
import Image from "next/image";
import logo from "../public/title.webp";
import { useWindowSize } from "@/utils/hooks/useWindowSize";

const Lobby = () => {
  const widowSize = useWindowSize();
  const isSmallScreen = widowSize.width < 600;
  return (
    <div className="relative h-full-vh w-full flex-center mt-3">
      <Navbar styles={styles} />
      <div
        className={`${styles.card} relative maxw-1100 flex-colOnMob justify-between px-32 py-32`}
      >
        <Image
          src={logo}
          className="absolute h-80 w-200 -top-8 left-0 right-0 mx-auto"
        />
        <LeftContainer styles={styles} />
        {!isSmallScreen && <CenterContainer styles={styles} />}
        {!!isSmallScreen && <hr></hr>}
        <RightContainer styles={styles} />
      </div>
    </div>
  );
};

export default Lobby;
