import { Col, Input, Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const DISPLAY_SIZES = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 12, offset: 6 },
  xl: { span: 12, offset: 6 },
};
interface Props {
  setSelectedMenu: (value: string) => void;
}

const Package: React.FC<Props> = ({ setSelectedMenu }) => {
  const [title, setTitle] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [minOrderNumber, setMinOrderNumber] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [To, setTo] = useState<string>("");
  return (
    <div>
      <Col {...DISPLAY_SIZES}>
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={title} />
          </Form.Item>
          <Form.Item label="Rate">
            <Input value={rate} />
          </Form.Item>
          <Form.Item label="Minimum Order Number">
            <Input value={minOrderNumber} />
          </Form.Item>
          <Form.Item label="Discount">
            <Input value={discount} />
          </Form.Item>
          <Form.Item label="From">
            <Input />
          </Form.Item>
          <Form.Item label="To">
            <Input />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea />
          </Form.Item>
          <Form.Item style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => {
                setSelectedMenu("dashbord");
              }}
              block
            >
              Save
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              danger={true}
              onClick={() => {
                setSelectedMenu("dashbord");
              }}
              block
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Package;
