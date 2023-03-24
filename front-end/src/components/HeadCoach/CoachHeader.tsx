import { Badge, Col, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { MailOutlined, BellFilled, MenuOutlined } from "@ant-design/icons";

interface Props {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

const CoachHeader: React.FC<Props> = ({ drawerVisible, setDrawerVisible }) => {
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div>
      <Header
        style={{
          height: "60px",
          backgroundColor: "rgba(255,255,255,0.25)",
          borderBottom: "1px solid rgba(0,0,0,0.25)",
          borderTop: "1px solid rgba(0,0,0,0.25)",
        }}
      >
        <Space
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col xs={1} sm={0} md={0} lg={0}>
            <MenuOutlined
              onClick={toggleDrawer}
              style={{
                fontSize: 24,
                color: "blue",

                borderRadius: 20,
                padding: 8,
              }}
            />
          </Col>{" "}
          <span
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <a
              href="https://mail.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge count={60}>
                <MailOutlined style={{ fontSize: "30px", color: "#0077b6" }} />
              </Badge>
            </a>
            <Badge count={60}>
              <BellFilled style={{ fontSize: "30px", color: "#0077b6" }} />
            </Badge>
          </span>
        </Space>
      </Header>
    </div>
  );
};

export default CoachHeader;
