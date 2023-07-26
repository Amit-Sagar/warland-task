import { firebaseAuth, firebaseDb } from "./init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import moment from "moment";


export const firebaseGetUserInfoFromDb = async (id) => {
    try {
        const docRef = doc(firebaseDb, "users", id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.error(error);
    }
};


export const firebaseSignUp = async ({ username, email, password, router }) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result) => {
            const user = result.user;
            const displayName = username || user.email.split("@")[0];
            const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid);
            let creationTime = Number(
                moment(user.metadata.creationTime).format("x")
            );
            if (!userInfoFromDb) {
                const infos = {
                    displayName,
                    email: user.email,
                    uid: user.uid,
                    createdAt: creationTime,
                };
                await setDoc(doc(firebaseDb, "users", user.uid), infos);
                return {
                    name: `${displayName}`,
                    uid: user.uid,
                    email: user.email,
                    accessToken: user.accessToken,
                };
            }
            router.push('/')
        })
        .catch((err) => console.log(err));
};


export const firebaseLogin = async (userData) => {
    const { email, password } = userData
    const userInfo = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    ).then(async (result) => {
        const userInfoFromDb = await firebaseGetUserInfoFromDb(result.user.uid);
        return {
            name: userInfoFromDb.displayName,
            uid: result.user.uid,
            email: result.user.email,
            accessToken: result.user.accessToken,
        };
    }).catch((err) => console.log(err))

    return userInfo
};


