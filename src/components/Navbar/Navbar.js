import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "./navbarPage.css";

const CustomNavbar = () => {
  return (
    <>
      {/* Desktop View */}
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="custom-navbar d-none d-lg-flex"
      >
        <Container className="frisbee_custom_nabar">
          <div className="frisbee_custom_navabr">
            <Navbar.Brand href="#home" className="frisbee_custom_navabr_child">
              <img
                src="/frisbeeImage/Navbar_Logo.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </div>
          <Nav className="me-auto frisbee_location_mai_nav">
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#shop">Shop</Nav.Link>
            <Nav.Link href="#support">Support</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="English" id="language-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">English</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Other Language
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#notifications" className="position-relative">
              <i className="bi bi-bell"></i>
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                1
              </span>
            </Nav.Link>
            <Button variant="outline-light" href="#signin">
              Sign In
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile View */}
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="custom-navbar d-lg-none"
      >
        <Container>
          <div className="frisbee_custom_nabar">
            <Navbar.Brand href="#home" className="navbar-brand-custom">
              <img
                src="/frisbeeImage/Navbar_Logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="mobile-navbar-nav" />
          <Navbar.Collapse id="mobile-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Location" id="mobile-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Sarojini Park/ Delhi
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#shop">Shop</Nav.Link>
              <Nav.Link href="#support">Support</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown title="English" id="mobile-language-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">English</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Other Language
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#notifications" className="position-relative">
                <i className="bi bi-bell"></i>
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  1
                </span>
              </Nav.Link>
              <Button variant="outline-light" href="#signin">
                Sign In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
