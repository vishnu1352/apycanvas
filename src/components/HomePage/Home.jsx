import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
  Badge,
  Card,
  Spinner,
} from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Home.scss";
import sendRequestFunc from "../../utils/sendRequestFunc";
import { BASEURL } from "../../utils/URL";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getAllTypes = async () => {
    const response = await sendRequestFunc(`${BASEURL}/getItemTypes`, "GET");
    if (response.statusCode === 200) {
      setTypes(response.types);
    } else {
      // Handle error if needed
    }
  };

  const getItemByType = (type) => {
    navigate("getItemByType/" + type);
  };

  useEffect(() => {
    getAllTypes();
  }, []);

  return (
    <>
      <div className="homepage">
        <Navbar expand={false} className="navbar">
          <Container fluid>
            <Navbar.Brand href="#" className="fw-600">
              APY Canvas
            </Navbar.Brand>
            <RxHamburgerMenu onClick={handleShow} size={20} />
          </Container>
        </Navbar>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container className="mt-3">
              <Nav.Link href="#home">Home</Nav.Link>
            </Container>
            <Container className="mt-3">
              <Nav.Link onClick={() => navigate("/getAllItems")}>
                Catalog
              </Nav.Link>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>

        <div className="my-3 px-3 text-center fs-20 fw-600">
          Our Collections
        </div>

        <div className="mt-2">
          <div className="px-3">
            {types &&
              types.length > 0 ? (
              types.map((typ, index) => (
                <Card className="mb-3 shadow">
                  <Card.Img
                    variant="top"
                    src={typ.imageUrl}
                    style={{ "aspect-ratio": "3/2" }}
                  />
                  <Card.Body>
                    <Card.Title>{typ.type.toUpperCase()}</Card.Title>
                    <Card.Text className="fs-12">{typ.description}</Card.Text>
                    <Badge
                      className="p-2 cardbadge"
                      onClick={() => getItemByType(typ.type)}
                    >
                      Check Now
                    </Badge>
                  </Card.Body>
                </Card>
              ))):
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
              }
          </div>
        </div>
        <div className="my-4 text-center">
          <Badge
            className="cardbadge p-3 shadow"
            onClick={() => navigate("/getAllItems")}
          >
            View All Products
          </Badge>
        </div>
      </div>
    </>
  );
};

export default Home;
