import React, { useState, useRef } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import "./style.css";

interface Props {
  visible4: boolean;
  handleNext4: () => void;
  handleprevious4: (values: any) => void;
  handleCancel4: (values: any) => void;
  onFinish: (values: any) => void;
}

const PopUp4: React.FC<Props> = ({
  handleNext4,
  handleprevious4,
  handleCancel4,
  visible4,
  onFinish,
}) => {
  const ArrayPopUp4 = useRef<string[]>([]);

  const [fieldValue, setFieldValu] = useState<string>("");

  const addFileds = () => {
    if (fieldValue !== "") {
      ArrayPopUp4.current.push(fieldValue);
    }
  };

  const handleFinish = (values: any) => {
    handleNext4();
    onFinish(ArrayPopUp4);
  };

  return (
    <Modal
      title="Sign Up"
      open={visible4}
      onCancel={handleCancel4}
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
            onClick={handleprevious4}
          >
            Back
          </Button>
        </Form.Item>,
      ]}
    >
      <div className="header">
        <h1>Athletic Achievements</h1>
        <div className="text-container">
          <p className="text-1">
            List down all your notable Athletic achievement
          </p>
        </div>
        <h2>"Not all champions can be greate coaches"</h2>
      </div>

      <h3 className="sub-heading">Your list of Athletic achievements</h3>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form className="form" name="paperqulified" onFinish={handleFinish}>
          <Form.List
            name="Athletics"
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
                            //   required: true,
                            whitespace: true,
                            message: "Please input  athletic achievements ",
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
                    style={{ width: " 100%" }}
                    icon={<PlusOutlined />}
                  >
                    New achievements
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

export default PopUp4;
