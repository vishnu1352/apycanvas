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

const EditInventory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    price: 0,
    letter: "",
    imageUrl: "",
    isTransparent: "",
    type: "",
  });

  const [typesDropdown, setTypesDropdown] = useState([]);
  const isTransparentOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const handleInput = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleIsTransparentDropdown = (e) => {
    setItem({ ...item, isTransparent: e.value });
  };
  const handleTypeDropdown = (e) => {
    setItem({ ...item, type: e.value });
  };

  const getItemTypes = async () => {
    const options = [];
    const response = await sendRequestFunc(`${BASEURL}/getItemTypes`, "GET");
    if (response) setLoading(false);
    await response.forEach((type) =>
      options.push({ value: type.type, label: type.type })
    );
    setTypesDropdown(options);
  };

  const getItemById = async (id) => {
    toast.info("Please Wait...Fetching")
    const response = await sendRequestFunc(
      `${BASEURL}/getSingleItem/${id}`,
      "GET"
    );
    if (response.statusCode === 200) {
      setItem(response.item);
    }
  };
  const updateItem = async () => {
    toast.info("Updating....")
    const response = await sendRequestFunc(
      `${BASEURL}/editItem/${state.id}`,
      "POST",
      item
    );
    if (response.statusCode === 200) {
      toast.success("Update Success !")
      navigate("/viewinventory");
    }
  };
  useEffect(() => {
    //console.log(state.id);
    getItemById(state.id);
    getItemTypes();
  }, []);
  return (
    <>
    <ToastContainer position="top-right" autoClose={2000}/>
      <Card className="p-3 m-3 ">
        <Card.Img
          variant="top"
          src={item.imageUrl}
          style={{ width: "200px" }}
        />
        <Card.Body>
          <Card.Text>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Image URl</Form.Label>
                <Form.Control
                  as="textarea"
                  name="imageUrl"
                  onChange={handleInput}
                  value={item.imageUrl}
                  rows={3}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleInput}
                  value={item.price}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Letter</Form.Label>
                <Form.Control
                  type="text"
                  name="letter"
                  onChange={handleInput}
                  value={item.letter}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Is Transparent({item.isTransparent.toString()})
                </Form.Label>
                <Select
                  options={isTransparentOptions}
                  onChange={handleIsTransparentDropdown}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type ({item.type})</Form.Label>

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
