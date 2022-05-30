import React from "react";
import { Container, Row } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer footer-default">
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <div>
              <span className="copyright">
                &copy; {1900 + new Date().getYear()} Hacker News.
              </span>
              <a href=" #">Terms</a>
              <a href=" #">Privacy</a>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
