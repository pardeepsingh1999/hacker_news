import React from "react";
import {
  Navbar,
  NavbarBrand,
  // Collapse,
  // NavbarToggler,
  // Nav,
  // NavItem,
  // Input,
  // InputGroupText,
  // InputGroup,
} from "reactstrap";

const Header = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar
        expand="md"
        dark
        style={{ background: "#ff6600", color: "black" }}
      >
        <NavbarBrand href="/">
          <img
            className="border"
            src="/logo.png"
            alt="logo"
            width="30"
            height="30"
          />{" "}
          Heaker News
        </NavbarBrand>

        {/* <NavbarToggler onClick={() => setIsOpen((prev) => !prev)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav navbar style={{ marginLeft: "auto" }}>
            <NavItem className={isOpen ? "my-3" : ""}>
              <InputGroup>
                <Input type="text" placeholder="Search..." />
                <InputGroupText>
                  <i className="fa fa-search" />
                </InputGroupText>
              </InputGroup>
            </NavItem>
          </Nav>
        </Collapse> */}
      </Navbar>
    </div>
  );
};

export default Header;
