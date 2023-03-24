import React, { useState, useRef, useEffect } from "react";
import { Layout, Form, Input, Select, Button, Modal, Space } from "antd";
import "./style.css";

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  handleNext1: () => void;
  handleCancel1: (values: any) => void;
  onFinish: (values: any) => void;
  visible1: boolean;
}

const PopupModal: React.FC<Props> = ({
  handleCancel1,
  handleNext1,
  visible1,
  onFinish,
}) => {
  //----------------------------------------------

  const handleFinish = (values: any) => {
    handleNext1();
    onFinish(ArrayPopUp1);
  };

  //---------------------------------------------------
  const [form] = Form.useForm();
  const userRef = useRef<HTMLInputElement>();

  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [nicNo, setNicNo] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const ArrayPopUp1 = useRef<string[]>([]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    ArrayPopUp1.current[0] = fName;
  }, [fName]);

  useEffect(() => {
    ArrayPopUp1.current[1] = lName;
  }, [lName]);

  useEffect(() => {
    ArrayPopUp1.current[2] = pwd;
  }, [pwd]);

  useEffect(() => {
    ArrayPopUp1.current[3] = nicNo;
  }, [nicNo]);

  useEffect(() => {
    ArrayPopUp1.current[4] = address;
  }, [address]);

  useEffect(() => {
    ArrayPopUp1.current[5] = gender;
  }, [gender]);

  const handleSubmit = () => {
    form.submit();
  };
  return (
    <Modal
      closable={true}
      title="Sign Up"
      open={visible1}
      okButtonProps={{ style: { display: "none" } }}
      // onOk={handleNext1}
      okText="Next"
      onCancel={handleCancel1}
      cancelButtonProps={{ style: { display: "none" } }}
      className="modal"
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
            <Button block danger={true} onClick={handleCancel1}>
              Cancel
            </Button>
          </Form.Item>
        </Space>,
      ]}
    >
      <div className="header">
        <h1>Welcome!</h1>
        <div className="text-container">
          <p className="text-1">
            To complete your registration with our system and to start using our
            tols to build your business, please complete below steps
          </p>
        </div>
        <h2>Tell us about yourself</h2>
      </div>
      <Form
        className="form"
        form={form}
        name="welcome"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            label="First Name"
            name="First_Name"
            hasFeedback
            rules={[
              {
                // required: true,
                message: "Please input your first name ",
              },

              {
                pattern: /^[a-zA-Z]+$/,
                message: "First Name can only contain letters",
              },
              {
                min: 4,
                message: "First Name must have at least 4 characters",
              },
            ]}
          >
            <Input
              ref={userRef as any}
              value={fName}
              onChange={(e) => {
                setFName(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="Last_Name"
            hasFeedback
            rules={[
              {
                // required: true,
                message: "Please input your last name!",
              },

              {
                pattern: /^[a-zA-Z]+$/,
                message: "First Name can only contain letters",
              },
              {
                min: 4,
                message: "First Name must have at least 4 characters",
              },
            ]}
          >
            <Input
              value={lName}
              onChange={(e) => {
                setLName(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                // required: true,
                message: "Please input your password!",
              },
              // {
              //   validator: (_, value) => {
              //     if (!value) {
              //       return Promise.reject("You must have a password");
              //     }

              //     return Promise.resolve();
              //   },
              // },
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
            <Input.Password
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="ConfirmP_assword"
            hasFeedback
            rules={[
              {
                // required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: false, message: "Please input address" }]}
          >
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </Form.Item>

          <Form.Item
            label="Nic No"
            name="nicNo"
            hasFeedback
            rules={[
              {
                // required: true,
                message: "Please input your NIC!",
              },

              {
                pattern: /^\d{9}[Vv]$|^\d{12}$/,
                message:
                  "NIC must start with 9 digits and end with a capital or lowercase V, or have 12 digits with no letters",
              },
            ]}
          >
            <Input onChange={(e) => setNicNo(e.target.value)} value={nicNo} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                // required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select
              placeholder="select your gender"
              value={gender}
              onChange={(gender) => setGender(gender)}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default PopupModal;
