import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Spin,
  message,
  Avatar,
  Card,
  Skeleton,
  Tooltip,
} from "antd";
import { Header } from "antd/es/layout/layout";
import "../HeadCoach/MyClient.css";
import Email from "../../components/Messages/Email";
import InternalServerError from "../../components/Errors/500";
import Generate from "../../components/signup/Generate";
import { PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import GenerateLink from "../../components/signup/Generate";

const CoachList = () => {
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
      .get("http://localhost:5001/api/getcoaches", {})
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

  const [openLinkGeneartor, setOpenLinkGeneartor] = useState(false);
  const handleLinkGenerator = () => {
    setOpenLinkGeneartor(!openLinkGeneartor);
  };
  return (
    <div
      style={{
        padding: "0 10px",
      }}
    >
      <Spin
        spinning={spin}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <GenerateLink
          openLinkGeneartor={openLinkGeneartor}
          setOpenLinkGeneartor={setOpenLinkGeneartor}
        />
        {serverError && <InternalServerError />}
        {!serverError && (
          <>
            <MsgModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              email={currentEmail}
            />

            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <>
                  <Tooltip title="Add a Coach">
                    <PlusOutlined key="setting" onClick={handleLinkGenerator} />
                  </Tooltip>
                </>,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  avatar={
                    <Avatar src="https://joesch.moe/api/v1/random?key=2" />
                  }
                  title="Number of Coaches"
                  description={numberOfclients}
                />
              </Skeleton>
            </Card>
            <div
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
            </div>

            <Table columns={columns} dataSource={clients}></Table>
          </>
        )}
      </Spin>
    </div>
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
        <div>Send Message for your customer</div>
      </Modal>
    </div>
  );
};

export default CoachList;
