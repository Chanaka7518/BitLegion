import { Modal, Form, Input, Button, Space } from "antd";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  handleNext2: () => void;
  handleprevious2: () => void;
  handleCancel2: () => void;
  visible2: boolean;
  onFinish: (values: any) => void;
}

const PopUp2: React.FC<Props> = ({
  handleprevious2,
  handleNext2,
  handleCancel2,
  visible2,
  onFinish,
}) => {
  const [form2] = Form.useForm();

  const ArrayPopUp2 = useRef<string[]>([]);

  const handleSubmit = () => {
    form2.submit();
  };
  const handleFinish2 = (values: any) => {
    onFinish(ArrayPopUp2);
    handleNext2();
  };

  const userRef = useRef<HTMLInputElement>();

  const [moNumber, setMoNumber] = useState<string>("");
  const [moNumberW, setMoNumberW] = useState<string>("");
  const [lLine, setLline] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [web, setWeb] = useState<string>("");

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    ArrayPopUp2.current[0] = moNumber;
  }, [moNumber]);

  useEffect(() => {
    ArrayPopUp2.current[1] = moNumberW;
  }, [moNumberW]);

  useEffect(() => {
    ArrayPopUp2.current[2] = lLine;
  }, [lLine]);

  useEffect(() => {
    ArrayPopUp2.current[3] = email;
  }, [email]);
  useEffect(() => {
    ArrayPopUp2.current[4] = web;
  }, [web]);

  return (
    <Modal
      title="Sign Up"
      open={visible2}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={handleCancel2}
      footer={[
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              block
              style={{ color: "#8794fa", borderColor: "#8794fa" }}
              danger={true}
              onClick={handleprevious2}
            >
              Back
            </Button>
          </Form.Item>
        </Space>,
      ]}
    >
      <div className="header">
        <h1>Contact Information</h1>
        <div className="text-container">
          <p className="text-1">
            This Information is what your prospective clients will be using to
            get in touch with you. Make sure its accurate
          </p>
        </div>
        <h2>"Greate coaches prioratize communication"</h2>
      </div>
      <Form
        className="form"
        form={form2}
        name="contact"
        layout="vertical"
        onFinish={handleFinish2}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            label="Mobile No"
            name="Mobile_Number"
            hasFeedback
            rules={[
              {
                // required: true,
                message: "Please input your mobile number",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }

                  return Promise.resolve();
                },
              },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number should start with 0 and have 10 digits",
              },
            ]}
          >
            <Input
              ref={userRef as any}
              value={moNumber}
              onChange={(e) => {
                setMoNumber(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="WhatssApp NO"
            name="WhatsApp"
            hasFeedback
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  return Promise.resolve();
                },
              },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number should start with 0 and have 10 digits",
              },
            ]}
          >
            <Input
              value={moNumberW}
              onChange={(e) => {
                setMoNumberW(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="LandLine"
            name="Land_Line"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  return Promise.resolve();
                },
              },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number should start with 0 and have 10 digits",
              },
            ]}
            hasFeedback
          >
            <Input onChange={(e) => setLline(e.target.value)} value={lLine} />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form.Item>

          <Form.Item name="Website" label="Website" hasFeedback>
            <Input onChange={(e) => setWeb(e.target.value)} value={web} />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
export default PopUp2;
