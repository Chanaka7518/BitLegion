import React, { useState } from "react";
import "./style.css";

import { Button, Form, Input, Modal, Space } from "antd";

interface Props {
  visible7: boolean;
  handleNext7: () => void;
  handleprevious7: (values: any) => void;
  handleCancel7: (values: any) => void;
  onFinish: (value1: string, value2: string, value3: string) => void;
}

const Socials: React.FC<Props> = ({
  visible7,
  handleNext7,
  handleprevious7,
  handleCancel7,
  onFinish,
}) => {
  const [form7] = Form.useForm();
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [tiktok, setTikTok] = useState<string>("");

  const next = () => {
    form7.submit();
    handleNext7();
    onFinish(facebook, instagram, tiktok);
  };

  return (
    <Modal
      title="Sign Up"
      open={visible7}
      onCancel={handleCancel7}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button style={{ width: "100%" }} onClick={next} type="primary">
            Next
          </Button>

          <Button
            style={{ color: "#8794fa", borderColor: "#8794fa" }}
            block
            danger={true}
            onClick={handleprevious7}
          >
            Back
          </Button>
        </Space>,
      ]}
    >
      <div className="header">
        <h1> Connect your socials</h1>
        <div className="text-container">
          <p className="text-1">
            Connecting your social media accounts will allow you to
            automatically post to the platform's fitness space
          </p>
        </div>

        <h2>"Greate businesses are built on loyal connections"</h2>
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form layout="vertical" form={form7}>
          <Form.Item label="Facebook">
            <Input
              name="Facebook"
              onChange={(e) => {
                setFacebook(e.target.value);
              }}
              value={facebook}
            />
          </Form.Item>
          <Form.Item label="Instagram">
            <Input
              name="Instagram"
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
              value={instagram}
            />
          </Form.Item>
          <Form.Item label="TikTok">
            <Input
              name="TikTok"
              onChange={(e) => {
                setTikTok(e.target.value);
              }}
              value={tiktok}
            />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};

export default Socials;
