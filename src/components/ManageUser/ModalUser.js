import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Users.scss";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);

  const defaultData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };

  const [userData, setUserData] = useState(defaultData);
  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data.EC === 0) {
      setUserGroup(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const check = () => {
    console.log("Check:", userData);
  };
  return (
    <>
      <Modal
        show={true}
        onHide={props.handleClose}
        size="lg"
        className="modal-container"
      >
        <Modal.Header>
          <Modal.Title>Modal User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
            <div className="row">
              <div className="col-12 col-sm-6 form-group">
                <label>Email: </label>
                <input
                  type="email"
                  className="form-control"
                  value={userData.email}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "email")
                  }
                />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Phone number: </label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.phone}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "phone")
                  }
                />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.username}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "username")
                  }
                />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={userData.password}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "password")
                  }
                />
              </div>

              <div className="col-12 col-sm-12 form-group">
                <label>Address: </label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.address}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "address")
                  }
                />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Gender: </label>
                <select className="form-select">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Group: </label>
                <select className="form-select">
                  {userGroup.length > 0 &&
                    userGroup.map((item, index) => {
                      return (
                        <>
                          <option key={`option"-${index}`} value={item.id}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => check()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
