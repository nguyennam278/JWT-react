import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
import "./Register.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const changeLoginPage = () => {
    history.push("/login");
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/testapi")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);
  const isValidted = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = RegExp(
      /^[\w-_+]+([.-]?[\w-_+]+)*@[\w-_+]+([.-]?[\w-_+]+)*(\.[\w-_+]{2,})+$/
    );
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!username) {
      toast.error("Username is required");
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Your password is not same");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidted();
    if (check === true) {
      let response = await registerNewUser(email, username, phone, password);
      if (+response.data.EC === 0) {
        toast.success(response.data.EM);
        history.push("/login");
      } else {
        toast.error(response.data.EM);
      }
    }
  };
  return (
    <div className="register-conatiner">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left d-none d-sm-block  col-7 d-flex flex-column gap-3">
            <div className="content-left__title  ">ThanhNam</div>
            <div className="content-left__detail">ThanhNam apppp</div>
          </div>

          <div className="content-right col-12 col-md-5 d-flex flex-column gap-3 ">
            <div className="title-hide d-sm-none ">ThanhNam</div>
            <div>
              <label className="form-group">Email:</label>
              <input
                type="text"
                className="form-control "
                placeholder="Email address "
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-group">User Name:</label>
              <input
                type="text"
                className="form-control "
                placeholder="Username "
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-group">Phone number:</label>
              <input
                type="text"
                className="form-control "
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-group">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-group">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={changeLoginPage}>
                You already have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
