import React, { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";
import "./Users.scss";
const Users = () => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let res = await fetchAllUser();
    if (res && res.data && res.data.EC === 0) {
      setListUser(res.data.DT);
    }
  };

  return (
    <div className="container">
      <div className="user-container">
        <div className="user-header">
          <div className="titile">
            <h3>Table Users</h3>
          </div>
          <div className="actions">
            <button className="btn btn-primary">Refresh</button>
            <button className="btn btn-success">Add new user</button>
          </div>
        </div>

        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Id</th>
                <th>Email</th>
                <th>Username</th>
                <th>Group</th>
              </tr>
            </thead>

            <tbody>
              {listUser && listUser.length > 0 ? (
                <>
                  {listUser.map((item, index) => {
                    return (
                      <tr key={`row=${index}`}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <h3>Not found Users</h3>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="user-footer">
          <nav aria-label="Page navigation example paginate">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Users;
