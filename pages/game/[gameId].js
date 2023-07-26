import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "@/firebase/init";
import AuthContext from "@/context/AuthContext";
import styles from '../../styles/Lobby.module.scss'
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import Button from "@/components/common/Button";

const Game = ({ gameId }) => {
    const [gameData, setGameData] = useState(null);
    const { user } = useContext(AuthContext)
    const router = useRouter();
    const windowWidth = useWindowSize()
    const isSmall = windowWidth.width
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchGame = async () => {
            try {
                if (!gameId) return
                const gameDocRef = doc(firebaseDb, "games", gameId)
                const gameDoc = await getDoc(gameDocRef);
                if (gameDoc.exists) {
                    const gameInfo = gameDoc.data();
                    setGameData(gameInfo);
                } else {
                    return;
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchGame();
    }, [gameId]);

    const handleLeaveGame = async () => {
        try {
            const docRef = doc(firebaseDb, 'games', gameId)
            await deleteDoc(docRef)
            router.push("/");
        } catch (error) {
            console.error("Error leaving game:", error);
        }
    };
    const handleAcceptInvitation = async () => {
        setLoading(true)
        try {
            const docRef = doc(firebaseDb, "games", gameId)
            await updateDoc(docRef, {
                status: "accepted",
            });
            setLoading(false)
            router.push(`/game/${gameId}`);
        } catch (error) {
            console.error("Error accepting invitation:", error);
            alert("Error accepting invitation. Please try again.");
        }
    };

    if (!gameData) {
        return (
            <div className="flex-center h-full-vh">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (gameData.status === "pending") {
        return (
            <div className="flex-center h-full-vh">
                <div >
                    <h1 className="text-center">Waiting for the second player to accept the invitation...</h1>
                    <div className={`${isSmall > 600 ? "flex-center" : "flex-column justify-center items-center"}  mt-5 gap-30`}>
                        <Button onClick={handleLeaveGame} label="Leave Game" classes={`${styles.redBtn} flex-center relative h-30 w-210 fs-18 font-oswald c-white`} />
                        {user && (
                            <Button onClick={handleAcceptInvitation} label={loading ? "Loading..." : "Accept Invitation"} classes={`${styles.yellowBtn} flex-center relative h-30 w-210 fs-18 font-oswald`} />
                        )}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="text-center mt-40">
            <h1 className="fs-40 mb-5">WarLand Game Zone!!</h1>
            <p className="fs-30">Let's Play Together</p>
        </div>
    );
};


export async function getServerSideProps(context) {
    const gameId = context?.query?.gameId;
    return {
        props: {
            gameId: gameId || null,
        },
    };
}

export default Game;