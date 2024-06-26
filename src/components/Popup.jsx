import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdCurrencyRupee } from "react-icons/md";
import { Form } from "react-bootstrap";
import "./Popup.scss";
import Modalcomponent from "./Modalcomponent";
import { useNavigate } from "react-router-dom";

const Popup = ({ toggle, toggleModal, data }) => {
  const [remarks, setRemarks] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reconfirmState, setReConfirmState] = useState({
    itemId: data._id,
    imageUrl: data.imageUrl,
    itemName: data.itemName,
    type: data.type,
    price: data.price,
    customRemarks: "",
    addrName: "",
    addrPhone: "",
    address: "",
    addrDistrict: "",
  });

  const navigate = useNavigate();
  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the modal
  };
  function handleInputChange(event) {
    setRemarks(event.target.value);
    setReConfirmState((prev) => ({
      ...prev,
      customRemarks: event.target.value,
    }));
  }
  function handleAddress(event) {
    setAddress(event.target.value);
    setReConfirmState((prev) => ({ ...prev, address: event.target.value }));
  }

  function redirectToReConfirmPage() {
   
    if (reconfirmState.addrName === "") {
      alert("Please Enter Your Name");
      return false;
    }
    if (reconfirmState.addrPhone === "") {
      alert("Please Enter Your Phone number");
      return false;
    }
    if (reconfirmState.addrDistrict === "") {
      alert("Please Enter District");
      return false;
    }
    if (reconfirmState.address === "") {
      alert("Please Enter address");
      return false;
    }

    navigate("/reconfirm", { state: { reconfirmState } });
  }

  return (
    <>
      <Modalcomponent
        show={toggle}
        onHide={toggleModal}
        classname="placeorderpopup"
      >
        <div className="d-flex gap-3 align-items-center ">
          <div>
            <a href={data.imageUrl} target="_blank" rel="noreferrer">
              <img
                src={data.imageUrl}
                alt={data.price}
                width="50px"
                className="popupimage heartbeat"
              />
            </a>
          </div>
          <div>
            <div className="heartbeat">
              <MdCurrencyRupee />
              {data.price}
            </div>
          </div>
        </div>
        <div className="mt-2 fs-14 fw-600">
          {data.itemName}
        </div>
        <div className="fs-10"><b>Description :</b> {data.description}</div>
        <div className="placeorderdiv">
          <div className="mt-2">
            <Form>
              <Form.Group
                className="mb-3 mt-3 fs-14"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  onClick={handleInputClick}
                  placeholder="Remarks and Customizations"
                  value={remarks}
                  onChange={handleInputChange}
                  className="fs-14"
                />
              </Form.Group>

              <div className="mt-3 fs-14">
                <b>Enter Your Address</b>
              </div>

              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onClick={handleInputClick}
                onChange={(e) => {
                  setName(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    addrName: e.target.value,
                  }));
                }}
                className="mb-3 fs-14"
              />

              <Form.Control
                type="number"
                placeholder="Enter Your Phone Number"
                value={phone}
                onClick={handleInputClick}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    addrPhone: e.target.value,
                  }));
                }}
                className="mb-3 fs-14"
              />

              <Form.Control
                type="text"
                placeholder="Enter your District"
                value={district}
                onClick={handleInputClick}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    addrDistrict: e.target.value,
                  }));
                }}
                className="mb-3 fs-14"
              />

              <Form.Control
                as="textarea"
                rows={3}
                onClick={handleInputClick}
                placeholder="Enter Your Complete Address"
                value={address}
                onChange={handleAddress}
                className="fs-14"
              />
            </Form>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 fs-14 mt-3">
          <Button variant="secondary" onClick={toggleModal} className="fs-14">
            Close
          </Button>
          <Button
            variant="primary"
            className="placeorder-button fs-12"
            onClick={() => {
              redirectToReConfirmPage();
            }}
          >
            Continue
          </Button>
        </div>
      </Modalcomponent>
    </>
  );
};

export default Popup;
