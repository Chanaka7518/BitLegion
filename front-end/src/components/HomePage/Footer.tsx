import { Col, Divider, Row, Typography } from "antd";
import "./footer.css";

const style: React.CSSProperties = {
  background: "#ffffff",
  padding: "8px 0",
  margin: "0px",
};

const Footer = () => {
  return (
    <div className="footer">
      <Row>
        <Col className="gutter-row" span={6} style={{ padding: "0px" }}>
          <div style={style}>
            <h2>Services</h2>
            <div className="footer-item">
              <ul>
                <li>
                  <a>Personal Training</a>
                </li>
                <li>
                  <a>Online Coaching</a>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6} style={{ padding: "0px" }}>
          <div style={style}>
            <h2>About</h2>
            <div className="footer-item">
              <ul>
                <li>
                  <a>Terms of service</a>
                </li>
                <li>
                  <a>Privacy Policy</a>
                </li>
                <li>
                  <a>Press & News</a>
                </li>
                <li>
                  <a>Memberships</a>
                </li>
                <li>
                  <a>Careers</a>
                </li>
              </ul>
            </div>
          </div>
        </Col>

        <Col className="gutter-row" span={6} style={{ padding: "0px" }}>
          <div style={style}>
            <h2>Support</h2>
            <div className="footer-item">
              <ul>
                <li>
                  <a>Selling on ALPHA LEE</a>
                </li>
                <li>
                  <a>Buying on ALPHA LEE</a>
                </li>
                <li>
                  <a>Help & Support</a>{" "}
                </li>
                <li>
                  <a>Trust & Safety</a>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6} style={{ padding: "0px" }}>
          <div style={style}>
            <h2>Community</h2>
            <div className="footer-item">
              <ul>
                <li>
                  <a>Community Standards</a>
                </li>
                <li>
                  <a>Become a Seller</a>
                </li>
                <li>
                  <a>Events</a>
                </li>
                <li>
                  <a>Blog</a>
                </li>
                <li>
                  <a>Forum</a>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <Row style={{ padding: "0px" }}>
        <Col>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p
              style={{
                width: "100px",
                height: "15px",
                backgroundColor: "white",
                paddingLeft: "5px",
              }}
            >
              ALPHA LEE
            </p>
            <p>&copy; Alpha Lee PVT LTD</p>
            <Typography.Link href="tel:+94765602490">
              +94-765602490
            </Typography.Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
