import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Col, Form, Space, Button, Menu, message, Rate } from "antd";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Reviews from "./Reviews";
import SocialAccounts from "./SocialAccounts";

//AVATAR

const onFinish = (values: any) => {
  console.log(values);
};

const DISPLAY_SIZES = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 12, offset: 6 },
  xl: { span: 12, offset: 6 },
};

const HeadCoachProfile = () => {
  const img1: string = new URL(`../profile.png`, import.meta.url).href;
  const { userData } = useAuthContext();
  let userId = userData?.userId;

  const [fName, setFName] = useState<string>("Chanaka");
  const [lName, setLName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [moNumber, setMoNumber] = useState<string>("");
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");
  const [landLine, setLandLine] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [selectedMenu, setSelectedMenu] = useState<string>("user");
  const [rating, setRating] = useState<number>(4);

  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`http://localhost:5001/api/coach/${userId}`, {})
        .then(function (response) {
          setFName(response.data.firstName);
          setLName(response.data.lastName);
          setAge(response.data.age);
          setMoNumber(response.data.moNumber);
          setWhatsAppNumber(response.data.whatsApp);
          setLandLine(response.data.lLine);
          setEmail(response.data.email);
          console.log(email);
          setGender(response.data.gender);
          console.log(response.data);
        })
        .catch(function (error) {
          message.error(error);
        })
        .finally(function () {});
    }
  }, [userData]);

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={img1}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </div>

        <Col
          {...DISPLAY_SIZES}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Rate disabled defaultValue={rating} />
        </Col>
        <p style={{ display: "flex", justifyContent: "center" }}>
          Welcome {fName}
        </p>
        <div>
          <Col {...DISPLAY_SIZES}>
            <Menu
              style={{
                background: "white",
                color: "black",
                backgroundColor: "rgba(0,255,0,0.25)",
                minWidth: "200px",
              }}
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["user"]}
              onClick={({ key }) => {
                setSelectedMenu(key);
              }}
              items={[
                { label: "User Details", key: "user" },
                { label: "Contact", key: "contact" },
                { label: "Social Accounts", key: "socialAccounts" },
                { label: "Reviews", key: "reviews" },
              ]}
            ></Menu>
          </Col>

          <Form
            name="form_item_path"
            onFinish={onFinish}
            layout="horizontal"
            labelCol={{ span: 6 }}
            labelAlign="left"
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {selectedMenu === "user" && (
                <div>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="First Name">
                      <Input
                        style={{ width: "100%" }}
                        value={fName}
                        onChange={(e) => {
                          setFName(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Last Name">
                      <Input
                        onChange={(e) => {
                          setLName(e.target.value);
                        }}
                        value={lName}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Age">
                      <Input
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        value={age}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Weight">
                      <Input
                        onChange={(e) => {
                          setWeight(e.target.value);
                        }}
                        value={weight}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Height">
                      <Input
                        onChange={(e) => {
                          setHeight(e.target.value);
                        }}
                        value={height}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Gender">
                      <Input
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        value={gender}
                      />
                    </Form.Item>
                  </Col>
                </div>
              )}
              {selectedMenu === "contact" && (
                <div>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Mobile">
                      <Input
                        onChange={(e) => {
                          setMoNumber(e.target.value);
                        }}
                        value={moNumber}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="WhatsApp">
                      <Input
                        value={whatsAppNumber}
                        onChange={(e) => {
                          setWhatsAppNumber(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="Landline">
                      <Input
                        value={landLine}
                        onChange={(e) => {
                          setLandLine(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item label="email">
                      <Input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </div>
              )}

              {/* Reviews */}
              {selectedMenu === "reviews" && (
                <Col {...DISPLAY_SIZES}>
                  {" "}
                  <Reviews />
                </Col>
              )}

              {/* Social Accounts */}
              {selectedMenu === "socialAccounts" && (
                <Col {...DISPLAY_SIZES}>
                  {" "}
                  <SocialAccounts />
                </Col>
              )}
              {!(selectedMenu === "reviews") && (
                <>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item style={{ margin: "40px 0px" }}>
                      <Button block type="primary">
                        Save changes
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Space>
          </Form>
        </div>
      </Space>
    </div>
  );
};

export default HeadCoachProfile;
