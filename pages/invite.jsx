import { firebaseDb } from "@/firebase/init";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import styles from "../styles/Lobby.module.scss";
import { useWindowSize } from "@/utils/hooks/useWindowSize";

const BASE_URL = "http://localhost:3000";

const Invite = () => {
  const { user } = useContext(AuthContext);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const [loading, setLoading] = useState(false);
  const windowWidth = useWindowSize();
  const isSmall = windowWidth.width;

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const senderId = user.uid;
      const receiverDoc = await getDocs(
        query(
          collection(firebaseDb, "users"),
          where("email", "==", receiverEmail)
        )
      );

      if (!receiverDoc.empty) {
        const receiverId = receiverDoc.docs[0].id;
        const gameDoc = await addDoc(query(collection(firebaseDb, "games")), {
          players: [senderId, receiverId],
          status: "pending",
        });
        setInvitationLink(`${window.location.hostname}/game/${gameDoc.id}`);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Receiver email not found.");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <div className="flex-center h-full-vh">
      <div>
        <h1 className="text-center fs-48">Invite a Friend</h1>
        {invitationLink ? (
          <div>
            <div
              className={`bg-black h-60 flex-center px-32 border-white mt-5 ${
                isSmall > 600 ? "fs-24 " : "fs-16 w-90p mx-auto"
              } `}
            >
              <p>
                Invitation Link:
                <a href={invitationLink} className="ml-5 c-white">
                  {invitationLink}
                </a>
              </p>
            </div>
            <p
              className={`text-center mt-5 ${
                isSmall > 600 ? "fs-20" : "fs-14"
              }`}
            >
              Share this link with your friend. They can use it to join the
              game.
            </p>
          </div>
        ) : (
          <div className="mt-5 flex-column justify-center items-center">
            <Input
              placeholder="Enter friend's email"
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              containerClass="w-300"
            />

            <Button
              label={loading ? "Loading..." : "Send Invitation"}
              classes={`${styles.withdrawBtn} flex-center relative h-45 w-170 mt-3 fs-18 font-oswald text-white`}
              onClick={handleInvite}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Invite;
