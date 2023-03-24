import { Button, Form, Input, message, Modal, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

type Prop = {
  email?: string;
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
};
const Email: React.FC<Prop> = ({ email, isOpen, setIsOpen = () => {} }) => {
  const [form] = Form.useForm<any>();

  const navigateTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log(values);
    setLoading(true);
    axios
      .post("http://localhost:5001/api/sendMail", {
        email: email,
        subject: values.subject,
        message: values.message,
      })
      .then(function (response) {
        if (response.data.message === "Email was  sent successfully") {
          setLoading(false);
          message.success(response.data.message);
          setIsOpen(false);
        }

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const okHandler = () => {
    form.submit();
  };
  return (
    <Modal
      title="Send an Email"
      open={isOpen}
      onCancel={() => {
        setIsOpen(!isOpen);
      }}
      footer={[
        <Button type="primary" loading={loading} onClick={okHandler}>
          Send Email
        </Button>,
      ]}
    >
      <Form onFinish={onFinish} form={form} name="sendMail" layout="vertical">
        <Form.Item label="To">
          <Input value={email} />
        </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: "Enter a subject",
            },
          ]}
        >
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: "Enter message for your customer",
            },
          ]}
        >
          <TextArea
            placeholder="Enter your message here"
            autoSize={{ minRows: 2, maxRows: 20 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Email;
