import React, { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import "./Users.scss";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await fetchAllUser();
  };

  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res.data.EC === 0) {
      toast.success(res.data.EM);
      await fetchUser();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.data.EM);
    }
  };

  const fetchUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.data && res.data.EC === 0) {
      setListUser(res.data.DT.users);
      setTotalPages(res.data.DT.totalPages);
    }
  };

  return (
    <>
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
                  <th>Actions</th>
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
                          <td>
                            <button className="btn btn-warning mx-3">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>
                        <h3>Not found Users</h3>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleCloseModalDelete}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
    </>
  );
};

export default Users;
