import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Button, Space } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const CreateNewPassword: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [msg, setMsg] = useState<boolean>(false);
  const [pwd, setPassword] = useState<string>("");

  const [form] = Form.useForm();

  const { id, token } = useParams();

  const history = useNavigate();

  const userValid = async () => {
    axios
      .get(`http://localhost:5001/api/newPassword/${id}/${token}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log("Token expired. Generate new token");
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    userValid();
  }, []);

  const handleOk = async () => {
    form.submit();

    axios
      .post(`http://localhost:5001/api/changePassword/${id}/${token}`, {
        password: pwd,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = () => {};

  return (
    <>
      <Modal
        title="Reset Password"
        open={open}
        onOk={handleOk}
        okText="Reset"
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
          <Form.Item
            name="password"
            // label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Add new Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            // label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
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
            <Input.Password
              placeholder="Confirm new Password"
              onChange={(e) => setPassword(e.target.value)}
              value={pwd}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNewPassword;
