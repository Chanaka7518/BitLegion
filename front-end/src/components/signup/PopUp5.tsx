import React, { useState, useRef } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import "./style.css";

interface Props {
  visible5: boolean;
  handleNext5: () => void;
  handleprevious5: (values: any) => void;
  handleCancel5: (values: any) => void;
  onFinish: (values: any) => void;
}
const PopUp5: React.FC<Props> = ({
  handleNext5,
  handleprevious5,
  handleCancel5,
  visible5,
  onFinish,
}) => {
  const ArrayPopUp5 = useRef<string[]>([]);

  const [fieldValue, setFieldValu] = useState<string>("");

  const addFileds = () => {
    if (fieldValue !== "") {
      ArrayPopUp5.current.push(fieldValue);
    }
  };

  const handleFinish = (values: any) => {
    onFinish(ArrayPopUp5);
    handleNext5();
  };
  return (
    <Modal
      title="Sign Up"
      open={visible5}
      onCancel={handleCancel5}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            htmlType="submit"
            type="primary"
            onClick={handleFinish}
          >
            Next
          </Button>
        </Form.Item>,
        <Form.Item>
          <Button
            danger={true}
            style={{ width: "100%", color: "#8794fa", borderColor: "#8794fa" }}
            onClick={handleprevious5}
          >
            Back
          </Button>
        </Form.Item>,
      ]}
    >
      <div className="header">
        <h1>Work Experiences</h1>
        <div className="text-container">
          <p className="text-1">
            List down your work experience in personal training and online
            coaching. You can list down the gyms you worked at or managed as
            well
          </p>
        </div>
        <h2>"The only source of expertise is experience"</h2>
      </div>

      <h3 className="sub-heading">Your list of Work Experience</h3>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form className="form" name="workExperience" onFinish={handleFinish}>
          <Form.List
            name="WorkExperiences"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("At least 1 passengers"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      className="dynamic-item"
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        // className="form-item"
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input Work experiences",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          style={{ width: " 80%", marginLeft: "10%" }}
                          placeholder="Ex-SELF LEARNT"
                          onChange={(e) => {
                            setFieldValu(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                        style={{ color: "red" }}
                      />
                    </Form.Item>
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      addFileds();
                    }}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    New experience
                  </Button>

                  {/* <Form.ErrorList errors={errors} /> */}
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Space>
    </Modal>
  );
};

export default PopUp5;
