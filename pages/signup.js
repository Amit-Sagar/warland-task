import { useState } from "react";
import { useRouter } from "next/router";
import { firebaseSignUp } from "../firebase/main";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import styles from "../styles/Lobby.module.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    await firebaseSignUp({ username, email, password, router });
    router.push('/login')
  };

  return (
    <div className="flex-center px-32 h-full-vh">
      <div className="flex-column gap-30 justify-center items-center">
        <h1>Sign Up</h1>
        <Input
          containerClass="w-300"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          containerClass="w-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          containerClass="w-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />
        <p>If you already have an account. Please <a href="/login" className="c-white">Login</a> !</p>
        <Button label="Sign Up" onClick={handleSignup} classes={`${styles.grayBtn} flex-center relative h-45 w-170 mt-3 fs-18 font-oswald text-white`} />
      </div>
    </div>
  );
};

export default Signup;
