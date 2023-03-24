import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "antd";
import "./style.css";

interface Props {
  visible8: boolean;
  handleFinish: () => void;
  handleprevious8: (values: any) => void;
  handleCancel8: (values: any) => void;
  onFinish: (values: any) => void;
}

const Done: React.FC<Props> = ({
  handleFinish,
  handleprevious8,
  handleCancel8,
  visible8,
  onFinish,
}) => {
  const [tickAgreement, setTickAgreeement] = useState<boolean>(false);
  const [tickSuscription, settickSbscription] = useState<boolean>(false);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [sbscribe, setSubscribe] = useState<boolean>(false);

  const [form] = Form.useForm();

  // useEffect(() => {}, [sbscribe]);
  const submitForm = (values: any) => {
    onFinish(sbscribe);
  };

  return (
    <Modal
      title="Sign Up"
      open={visible8}
      onCancel={handleCancel8}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Form.Item style={{ marginTop: "15px" }}>
          <Button
            style={{ width: "100%" }}
            onClick={submitForm}
            type="primary"
            htmlType="submit"
            disabled={tickAgreement ? false : true}
          >
            Sign Up
          </Button>
        </Form.Item>,
        <Form.Item>
          <Button
            style={{ width: "100%", color: "#8794fa", borderColor: "#8794fa" }}
            onClick={handleprevious8}
          >
            Back
          </Button>
        </Form.Item>,
      ]}
    >
      <div className="header">
        <h1>It's Nearly Done</h1>
        <div className="text-container">
          <p className="text-1">
            You are aalmost done registering with our system. Read thrugh our
            terms and conditions before cmmitting
          </p>
        </div>

        <h2 className="quote-1">"Take a few minutes and read"</h2>
      </div>
      <Form className="form" name="done" form={form} onFinish={submitForm}>
        <div
          className="item-1"
          style={{ backgroundColor: tickAgreement ? "#e9ecef" : "white" }}
        >
          <div
            className="conditions-and-sbscribe"
            onClick={() => {
              setTickAgreeement(!tickAgreement);
              setAgreement(!agreement);
            }}
          >
            I accept these terms and conditions
          </div>
          <input
            type="checkbox"
            className="c-box"
            checked={tickAgreement ? true : false}
            onChange={() => {
              setTickAgreeement(!tickAgreement);
              setAgreement(!agreement);
            }}
          />
        </div>
        <div
          className="item-1"
          style={{ backgroundColor: tickSuscription ? "#e9ecef" : "white" }}
        >
          <div
            className="conditions-and-sbscribe"
            onClick={() => {
              settickSbscription(!tickSuscription);
              setSubscribe(!sbscribe);
            }}
          >
            Subscribe to business news letter
          </div>
          <input
            type="checkbox"
            className="c-box"
            checked={tickSuscription ? true : false}
            onChange={() => {
              settickSbscription(!tickSuscription);
              setSubscribe(!sbscribe);
            }}
          />
        </div>
        <p className="last-p">
          Once you sign up, you will be takn to your Coaching Dashboard where
          the tools for your success are waiting for you
        </p>
      </Form>
    </Modal>
  );
};

export default Done;
