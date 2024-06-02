import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdCurrencyRupee } from "react-icons/md";
import { Form } from "react-bootstrap";
import "./Popup.scss";
import Modalcomponent from "./Modalcomponent";

const Popup = ({ toggle, toggleModal, data, doorder }) => {
  const [remarks, setRemarks] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the modal
  };
  function handleInputChange(event) {
    setRemarks(event.target.value);
  }
  function handleAddress(event){
    setAddress(event.target.value);
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
            <a href={data.imageurl} target="_blank">
              <img
                src={data.imageurl}
                alt={data.price}
                width="90px"
                className="popupimage heartbeat"
              />
            </a>
          </div>
          <div>
            <div classname="heartbeat">
              <MdCurrencyRupee />
              {data.price} <span className="fs-10">+shipping</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onClick={handleInputClick}
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
            />

            <Form.Control
              type="text"
              placeholder="Enter your District"
              value={district}
              onClick={handleInputClick}
              onChange={(e) => setDistrict(e.target.value)}
              className="mb-3"
            />

            
              <Form.Control
                as="textarea"
                rows={3}
                onClick={handleInputClick}
                placeholder="Enter Your Complete Address"
                value={address}
                onChange={handleAddress}
              />
            

            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                onClick={handleInputClick}
                placeholder="Remarks and Customizations"
                value={remarks}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={toggleModal} className="close-button">
            Close
          </Button>
          <Button
            variant="primary"
            className="placeorder-button"
            onClick={() => {
              doorder(data.imageurl, data.price, remarks, district, name,address);
              setRemarks("");
            }}
          >
            Place Order
          </Button>
        </div>
      </Modalcomponent>
    </>
  );
};

export default Popup;
