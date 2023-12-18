import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Users = () => {
  let history = useHistory();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Users;
