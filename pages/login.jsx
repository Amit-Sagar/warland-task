import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import styles from "../styles/Lobby.module.scss";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useContext(AuthContext);

  const handleSubmit = () => {
    const userData = { email, password };
    login(userData);
  };
  return (
    <div className="flex-center px-32 h-full-vh">
      <div className="flex-column gap-30 justify-center items-center">
        <h1>Login</h1>
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
          placeholder="Password"
        />
        <p>
          Don't have an account.
          <a href="/signup" className="c-white">
            Create an account
          </a>{" "}
          !
        </p>

        <Button
          classes={`${styles.grayBtn} flex-center  h-45 w-170 mt-3 fs-18 font-oswald text-white`}
          label={loading ? "Loading..." : "Login"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
