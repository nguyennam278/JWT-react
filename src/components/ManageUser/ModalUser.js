import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Users.scss";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    getGroup();
  });
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data.EC === 0) {
      setUserGroup(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
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
                <input type="email" className="form-control" />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Phone number: </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Username: </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>Password: </label>
                <input type="password" className="form-control" />
              </div>

              <div className="col-12 col-sm-12 form-group">
                <label>Address: </label>
                <input type="text" className="form-control" />
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
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
