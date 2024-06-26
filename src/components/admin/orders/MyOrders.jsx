import React, { useEffect, useState,useRef } from "react";
import sendRequestFunc from "../../../utils/sendRequestFunc";
import { BASEURL } from "../../../utils/URL";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiMiniEye } from "react-icons/hi2";
import Modalcomponent from "../../Modalcomponent";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [toggleModal, setToggleModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState("");
  const totalAmountRef = useRef(0);

  const getAllOrders = async () => {
    const response = await sendRequestFunc(`${BASEURL}/getAllOrders`, "GET");
    console.log(response);
    if (response.statusCode === 200) {
       totalAmountRef.current = response.totalAmount;
      setOrderData(response.orders.reverse()); 
    }
  };
  const viewOrder = (myOrder) => {
    setUpdateStatus(myOrder);
    setToggleModal(true);
  };
  const changeStatusFunc = (e) => {
    setUpdatedStatus(e.target.value);
  };
  const updateOrderStatus = async (id) => {
    if (updatedStatus === "---") {
      toast.error("Please select a status");
    } else {
      const request = {
        id: id,
        status: updatedStatus,
      };
      const response = await sendRequestFunc(
        `${BASEURL}/updateOrderStatus`,
        "POST",
        request
      );
      if (response.statusCode === 200) {
        setToggleModal(false);
        getAllOrders();
      }
    }
  };

  const redirectToWhatsapp = (phoneno) => {
    const url = "https://api.whatsapp.com/send?phone=" + phoneno + "&text=%0a";
    window.open(url, "_blank");
  };
  const fliterByStatus = (status) => {
    setFilter(status);
  };
  const myOrders = orderData.filter((order) => {
    if (filter === "all" || filter === order.status) return order;
  });
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container p-3">
        <div className="d-flex justify-content-between align-items-center">
          <Button onClick={() => navigate("/addinventory")}>
            <MdOutlineKeyboardBackspace />
          </Button>

          <Badge bg="warning" text="dark">
          Total Amount : {totalAmountRef.current}
          </Badge>

          <Dropdown className="fs-12">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="fs-12"
            >
              status
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => fliterByStatus("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => fliterByStatus("pending")}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => fliterByStatus("completed")}>
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          {myOrders && myOrders.length > 0 ? (
            myOrders.map((myOrder) => {
              return (
                <Card className="shadow border border-light rounded mt-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img
                          src={myOrder.imageUrl}
                          alt=""
                          style={{ width: "50px" }}
                          className="rounded shadow"
                        />
                      </div>
                      <div>
                        <FaIndianRupeeSign /> {myOrder.price}
                      </div>
                      <div>
                        <Badge
                          bg={
                            myOrder.status === "pending" ? "danger" : "success"
                          }
                          className="fs-10"
                        >
                          {myOrder.status}
                        </Badge>
                      </div>
                      <div onClick={() => viewOrder(myOrder)}>
                        <HiMiniEye />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczO63fbtt-z8KWCPO2kXnKjhuiKKJbUPXtcC5Mq3VTOjp8XqnJPBsGBgoitFubiL5RQcpcDIrJl7H5vFVlvNl1TFOZzEqlhURmaou0sX7dUv7E8xufCD=s250-p-k"
                alt="No Results Found"
              />
            </div>
          )}
        </div>
        {toggleModal && (
          <Modalcomponent show={toggleModal}>
            {updateStatus && (
              <>
                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Sno : </b>
                  </div>
                  <div>{updateStatus.sno}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Name On Item : </b>
                  </div>
                  <div>{updateStatus.customizedName}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Selected Color : </b>
                  </div>
                  <div>{updateStatus.selectedColor}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Customizations : </b>
                  </div>
                  <div>{updateStatus.customRemarks}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Price : </b>
                  </div>
                  <div>{updateStatus.price}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Ordered By : </b>
                  </div>
                  <div>{updateStatus.addrName}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Phone : </b>
                  </div>
                  <div>
                    <Button
                      onClick={() => redirectToWhatsapp(updateStatus.addrPhone)}
                      className="fs-12 p-1"
                    >
                      {updateStatus.addrPhone}
                    </Button>
                  </div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Address : </b>
                  </div>
                  <div>{updateStatus.address}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>District : </b>
                  </div>
                  <div>{updateStatus.addrDistrict}</div>
                </div>

                <div className="d-flex gap-3 fs-14 px-3 mt-2">
                  <div>
                    <b>Status : </b>
                  </div>
                  <div>
                    <span>
                      <b>{updateStatus.status}</b> change to{" "}
                    </span>
                    <select onChange={(e) => changeStatusFunc(e)}>
                      <option value="---">Set Status</option>
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                </div>
                <Button
                  className="mt-4 px-3 w-100 fs-12"
                  onClick={() => updateOrderStatus(updateStatus._id)}
                >
                  Update
                </Button>
                <Button
                  variant="secondary"
                  className="mt-2 px-3 w-100 fs-12"
                  onClick={() => setToggleModal(false)}
                >
                  Close
                </Button>
              </>
            )}
          </Modalcomponent>
        )}
      </div>
    </>
  );
};

export default MyOrders;
