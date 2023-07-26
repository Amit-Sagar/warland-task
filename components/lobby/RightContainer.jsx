import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import editIcon from "../../public/edit-icon.png";
import Select from "../common/Select";

const RightContainer = ({ styles }) => {
  const selectOption = ["1", "3", "5", "7", "10", "12", "15", "20"];
  const [ticketStatus, setTicketStatus] = useState({});
  const [gameMode, setGameMode] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketStatus({ ...ticketStatus, [name]: value });
  };

  return (
    <div className="flex-column justify-center items-center gap-20 px-16 py-16 flex-1 mt-5">
      <div className="flex-column justify-center items-center">
        <p className="font-oswald fs-18">SELECT TICKETS</p>
        <div className="mt-2">
          <Input
            icon={editIcon}
            value={ticketStatus?.SelectedTicket ?? 0}
            type="text"
            containerClass="w-210"
            inputClass="text-center"
            name="selectedTicket"
            onChange={handleChange}
          />
        </div>
        <p className="mt-2 fs-14 text-center font-oswald">
          85 GQ + 89.49 GQ (Relayer + BSC fees) = 174.49 GQ
        </p>
      </div>
      <Button
        label="APPROVE & BUY"
        classes={`${styles.yellowBtn} flex-center relative h-45 w-210 font-oswald fs-20`}
      />
      <div className="flex-column justify-center items-center">
        <p className="text-center fs-18 font-oswald fw-200">SELECTED ENTRY TICKETS</p>
        <Select
          options={selectOption}
          value={ticketStatus?.entryTicket ?? 1}
          onChange={handleChange}
          name="entryTicket"
        />
      </div>
      <div className="text-center fs-18">
        <p className="font-oswald">SELECT GAME MODE</p>
        <div className="flex justify-between w-210 mt-2">
          <Button
            label="1 vs 1 "
            classes={`${styles.modeBtn} ${
              gameMode == 1 ? "bg-dull-blue c-dark-gray" : "b-transparent"
            } h-40 w-90 flex-center cursor-pointer`}
            onClick={() => setGameMode(1)}
          />
          <Button
            label="1 vs 5 "
            classes={`${styles.modeBtn} ${
              gameMode == 2 ? "bg-dull-blue c-dark-gray" : "bg-transparent"
            } h-40 w-90 flex-center cursor-pointer`}
            onClick={() => setGameMode(2)}
          />
        </div>
      </div>

      <Button
        label="PLAY WITH FRIENDS"
        classes={`${styles.yellowBtn} flex-center relative h-45 w-210 font-oswald fs-20`}
      />
      <Button
        label="START DUEL!"
        classes={`${styles.redBtn} flex-center relative h-50 w-260 fs-24 font-oswald mt-2`}
      />
    </div>
  );
};

export default RightContainer;
