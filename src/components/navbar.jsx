import React from "react";
import { Container, Image, Navbar, Nav } from "react-bootstrap";

const NavbarUser = () => {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom border-light border-5"
    >
      <Container fluid style={{paddingLeft: "10%", paddingRight: "10%"}}>
        <Navbar.Brand href="/">
          <Image
            src="https://sejutacita.id/static/media/logo-bg-new.14982478.png"
            height={70}
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-end text-primary"
        >
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUser;
