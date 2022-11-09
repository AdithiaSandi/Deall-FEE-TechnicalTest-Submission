import React from "react";
import { Container, Image, Navbar, Nav, Col } from "react-bootstrap";

const NavbarUser = () => {
  return (
    <Navbar
      bg="white"
      expand="lg"
      sticky="top"
      className="border-bottom border-light border-5"
    >
      <Container fluid style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        <Navbar.Brand href="/">
          <Image
            src="https://sejutacita.id/static/media/logo-bg-new.14982478.png"
            height={70}
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="text-primary">
          <Col></Col>
          <Col>
            <Nav
              className="me-auto my-2 my-lg-0 text-primary"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                href="/"
                style={{
                  color: "#2b46a6",
                  fontSize: "20px",
                  fontFamily: "Roboto",
                }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                href="/bookmark"
                style={{
                  color: "#2b46a6",
                  fontSize: "20px",
                  fontFamily: "Roboto",
                }}
              >
                Bookmark
              </Nav.Link>
            </Nav>
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUser;
