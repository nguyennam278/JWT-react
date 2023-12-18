import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register/Register";
import Users from "./components/ManageUser/Users";
import { useEffect, useState } from "react";
import _ from "lodash";
function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <Router>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuth && <Nav />}
        <Switch>
          <Route path="/about">about</Route>
          <Route path="/news">news</Route>
          <Route path="/contact">contact</Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*" exact>
            404 not found
          </Route>
        </Switch>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
