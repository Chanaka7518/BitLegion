import React, { useState, useRef } from "react";
import { Input, Modal, Form } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

// for reset pwd
import { ToastContainer, toast } from "react-toastify";

const ForgetPwd: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  let message = useRef<boolean>(false);

  const [displayErr, setDisplayErr] = useState<string>("Default");
  const [form] = Form.useForm();

  const handleOk = (event: any) => {
    // form.submit();
    event.preventDefault();
    axios
      .post("http://localhost:5001/api/sendPwdResetLink", {
        email: email,
      })
      .then((response) => {
        // if (response.data.message === "User does not exists") {
        //   setDisplayErr(response.data.message);
        //   alert(response.data.message);
        // }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = () => {};

  return (
    <>
      <Modal
        title="Enter Your Email"
        open={open}
        onOk={handleOk}
        okText="Send"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="normal_login"
          form={form}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {message.current ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              password reset link sent successfully in your Email
            </p>
          ) : (
            ""
          )}
          <p>{displayErr}</p>
          <Form.Item
            style={{ margin: "30px 0px" }}
            name="email"
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
            <Input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ForgetPwd;
