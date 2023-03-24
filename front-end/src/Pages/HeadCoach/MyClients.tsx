import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Spin, message, Col } from "antd";

import { Header } from "antd/es/layout/layout";
import "./MyClient.css";
import Email from "../../components/Messages/Email";
import InternalServerError from "../../components/Errors/500";
import DashboardContent from "./DashboardContent";

const DISPLAY_SIZES = {
  xs: { span: 22, offset: 0 },
  sm: { span: 22, offset: 0 },
  md: { span: 22, offset: 1 },
  lg: { span: 22, offset: 1 },
  xl: { span: 22, offset: 1 },
};

const MyClients: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  let numberOfclients = clients.length;
  // fetch data

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [spin, setSpin] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  useEffect(() => {
    setSpin(!spin);
    axios
      .get("http://localhost:5001/api/getclients", {})
      .then(function (response) {
        if (
          response.data.message === "Internal server error.Please Try again"
        ) {
          setSpin(false);
          return setServerError(true);
        }

        if (response.status === 200) {
          setServerError(false);
          setClients(response.data);
          console.log(response.status);
          return setSpin(false);
        }
        // manage other errors
      })
      .catch(function (error) {
        setSpin(false);
        message.error(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  // add columns to the table
  const columns = [
    {
      key: "1",
      title: "Number",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "firstName",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      render: (email: string) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="email"
              style={{ color: "#0077b6" }}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
                setCurrentEmail(email);
              }}
            >
              {email}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <Col {...DISPLAY_SIZES}>
      <Spin
        spinning={spin}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {serverError && <InternalServerError />}
        {!serverError && (
          <>
            <MsgModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              email={currentEmail}
            />
            {/* <Email email={currentEmail} /> */}
            <Header
              style={{
                padding: "0 50px",
                height: "60px",
                color: "Black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                Active users - <span>{numberOfclients}</span>{" "}
              </div>
            </Header>

            <Table columns={columns} dataSource={clients}></Table>
          </>
        )}
      </Spin>
    </Col>
  );
};

type Prop = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  email?: string;
};

const MsgModal: React.FC<Prop> = ({ isModalOpen, setIsModalOpen, email }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Email isOpen={isOpen} setIsOpen={setIsOpen} email={email} />
      <Modal
        title={email}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        okButtonProps={{ style: { display: "none" } }}
        footer={[
          <Button
            style={{ width: "auto" }}
            onClick={() => {
              setIsOpen(!isOpen);
              setIsModalOpen(!isModalOpen);
            }}
          >
            Email
          </Button>,

          <Button style={{ width: "auto" }}>Chat</Button>,
        ]}
      >
        <div>Send Message to your customer</div>
      </Modal>
    </div>
  );
};
export default MyClients;
