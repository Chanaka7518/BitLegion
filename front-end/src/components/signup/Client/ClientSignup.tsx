import React, { useEffect, useState } from "react";
import { Modal, Checkbox, Form, Input, message, Space, Select } from "antd";
import "./ClientSignup.css";
import useSignupClient from "../../../Hooks/useSignupClient";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  //

  const { signup, error, isLoading } = useSignupClient();

  // ---------to send data------------------
  const home = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [fName, setFname] = useState<string>("");
  const [lName, setLname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [moNo, setMoNo] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onFinish = async (values: any) => {
    console.log(values);
    let fName = values.First_Name;
    let lName = values.Last_Name;
    let password = values.Confirm_Password;
    let email = values.Email;
    let moNo = values.Mobile_Number;
    let gender = values.Gender;

    await signup(fName, lName, password, email, moNo, gender);
  };
  const handleOk = () => {
    form.submit();
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    home("/");
  };

  return (
    <Modal
      title="Sign Up"
      style={{ maxWidth: "none", maxHeight: "none" }}
      open={isModalOpen}
      onOk={handleOk}
      okText="Sign Up"
      // okType="danger"
      // okButtonProps={{
      //   style: { border: "1px solid blue", color: "blue" },
      // }}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="First_Name"
          label="First Name"
          hasFeedback
          rules={[
            { required: true },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "First Name can only contain letters",
            },
            { min: 4, message: "First Name must have at least 4 characters" },
          ]}
        >
          <Input
            placeholder="First Name"
            onChange={(e) => setFname(e.target.value)}
            value={fName}
          />
        </Form.Item>
        <Form.Item
          name="Last_Name"
          label="Last Name"
          rules={[
            { required: true },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "First Name can only contain letters",
            },
            { min: 4, message: "First Name must have at least 4 characters" },
          ]}
        >
          {/* */}
          <Input
            placeholder="Last Name"
            onChange={(e) => setLname(e.target.value)}
            value={lName}
          />
        </Form.Item>
        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
              message:
                "Password must contain at least one letter, one number, and one special character",
            },
            { min: 8, message: "Password must have at least 8 characters" },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="Confirm_Password"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("Password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Email"
          rules={[
            { required: true },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          {/* onChange={(e) => setEmail(e.target.value)} value={email}  */}
          <Input placeholder="Emaill" />
        </Form.Item>

        <Form.Item
          name="Mobile_Number"
          label="Mobile No"
          rules={[
            { required: true },
            {
              pattern: /^0\d{9}$/,
              message: "Phone number should start with 0 and have 10 digits",
            },
          ]}
        >
          <Input placeholder="Mobile Number" />
        </Form.Item>
        <Form.Item
          label="Gender"
          className="form-item"
          name="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select className="inputs" placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Space style={{ display: "flex", justifyContent: "left" }}>
          <Form.Item
            name="Agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default App;
