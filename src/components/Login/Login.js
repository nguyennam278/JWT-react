import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const changeRegister = () => {
    history.push("/register");
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!valueLogin) {
      toast.error("Please enter email or phone number");
      return;
    }
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    let response = await loginUser(valueLogin, password);
    console.log(response.data);
    if (+response.data.EC === 0) {
      let data = {
        isAuth: true,
        token: "faketoken",
      };
      sessionStorage.setItem("account", JSON.stringify(data));

      history.push("/users");
      window.location.reload();
    } else {
      toast.error(response.data.EM);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/testapi")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-conatiner">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left d-none d-sm-block  col-7 d-flex flex-column gap-3">
            <div className="content-left__title  ">ThanhNam</div>
            <div className="content-left__detail">ThanhNam apppp</div>
          </div>

          <div className="content-right col-12 col-md-5 d-flex flex-column gap-3 ">
            <div className="title-hide d-sm-none ">ThanhNam</div>
            <input
              type="text"
              className="form-control "
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>

            <a href="#" className="forgot-password">
              Forgot your password
            </a>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={changeRegister}>
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
