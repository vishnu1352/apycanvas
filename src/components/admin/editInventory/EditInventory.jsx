import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sendRequestFunc from "../../../utils/sendRequestFunc";
import { BASEURL } from "../../../utils/URL";
import { Badge } from "react-bootstrap";

const EditInventory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    price: 0,
    itemName: "",
    imageUrl: "",
    description: "",
    type: "",
  });

  const [typesDropdown, setTypesDropdown] = useState([]);

  const handleInput = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleTypeDropdown = (e) => {
    setItem({ ...item, type: e.value });
  };

  const getItemTypes = async () => {
    const options = [{ value: "--", label: "--" }];
    const response = await sendRequestFunc(`${BASEURL}/getItemTypes`, "GET");
    await response.forEach((type) =>
      options.push({ value: type.type, label: type.type })
    );
    setTypesDropdown(options);
  };

  const getItemById = async (id) => {
    toast.info("Please Wait...Fetching");
    const response = await sendRequestFunc(
      `${BASEURL}/getSingleItem/${id}`,
      "GET"
    );
    if (response.statusCode === 200) {
      setItem(response.item);
    }
  };
  const updateItem = async () => {
    const response = await sendRequestFunc(
      `${BASEURL}/editItem/${state.id}`,
      "POST",
      item
    );
    if (response.statusCode === 200) {
      toast.success("Update Success !");
      navigate("/viewinventory");
    } else {
      toast.error("Oh Oh ! " + response.message);
    }
  };
  useEffect(() => {
    //console.log(state.id);
    getItemById(state.id);
    getItemTypes();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Card className="p-3 m-3 shadow">
        <Card.Img
          variant="top"
          src={item.imageUrl}
          style={{ width: "100px" }}
          className="shadow mx-3"
        />
        <Card.Body>
          <Card.Text>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Image URl</Form.Label>
                <Form.Control
                  as="textarea"
                  name="imageUrl"
                  onChange={handleInput}
                  value={item.imageUrl}
                  rows={3}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="letter"
                  onChange={handleInput}
                  value={item.itemName}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Item Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={handleInput}
                  value={item.description}
                  rows={3}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleInput}
                  value={item.price}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Type{" "}
                  <Badge bg="warning" text="dark">
                    {item.type}
                  </Badge>
                </Form.Label>

                <Select options={typesDropdown} onChange={handleTypeDropdown} />
              </Form.Group>
            </Form>
          </Card.Text>
          <Button variant="primary" onClick={updateItem}>
            Update
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditInventory;
