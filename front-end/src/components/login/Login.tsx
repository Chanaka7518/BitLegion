import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";

import { Button, Modal, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "./Login.css";
import NavBar from "../HomePage/NavBar";

// interface Props {
//   openModal: boolean;
//   showModal: (value: boolean) => void;
// }

const Login: React.FC = () => {
  const home = useNavigate();
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [openModal2, setOpenModal2] = useState<boolean>(true);
  const { login, error, isLoading } = useLogin();

  const onFinish = async () => {
    console.log(email);
    console.log(password);

    await login(email, password);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    // showModal(false);
    setOpenModal2(false);
    home("/");
  };

  useEffect(() => {}, [email, password]);
  return (
    <>
      <Modal
        open={openModal2}
        title="Login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            // disabled={isLoading}
            block
            key="submit"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={handleOk}
          >
            Log in
          </Button>,
          <Form.Item>
            <span style={{ width: "40px" }}>Or </span>
            <a href="/signup">register now!</a>
          </Form.Item>,
        ]}
      >
        <div className="login-form">
          <Form
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Form.Item
              hasFeedback
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
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Form.Item>

            <Form.Item
              hasFeedback
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                  message:
                    "Password must contain at least one letter, one number, and one special character",
                },
                { min: 8, message: "Password must have at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </Form.Item>

            <Form.Item>
              <Link className="login-form-forgot" to="/forgetpwd">
                Forgot password?
              </Link>{" "}
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Login;
