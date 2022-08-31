import React from "react";
import styles from "./Signin.module.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Notify } from "../../components/toast/Toast";
import {
  openLoader,
  closeLoader,
} from "../../redux/actions/loader/loaderActions";
import { useNavigate } from "react-router-dom";
import client from "../../api/baseUrl";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const LoginUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(openLoader());
    try {
      const { data }: any = await axios.post(
        `https://ltw-cms-stg.herokuapp.com/auth/local`,
        {
          identifier: email,
          password: password,
        }
      );
      dispatch(closeLoader());

      sessionStorage.setItem("access_token", data?.jwt);
      Notify("success", "Signed In Successfully");
      navigate("/activity");
    } catch (error: any) {
      dispatch(closeLoader());
    }
  };
  return (
    <div className={styles.formSection}>
      <div className={styles.login}>Login</div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="exampleInputEmail1" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="exampleInputPassword1" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="input-password"
            aria-describedby="emailHelp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <button
        type="submit"
        className={styles.loginButton}
        onClick={(e) => LoginUser(e)}
      >
        LOGIN
      </button>
    </div>
  );
};

export default SignIn;
