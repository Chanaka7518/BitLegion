import { Card, message, Space, Form, Input, Typography } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Hooks/useAuthContext";

const OCPhoto: string = new URL(`./online-coaching.jpg`, import.meta.url).href;
const PTPhoto: string = new URL(`./personal-Training.jpg`, import.meta.url)
  .href;

interface PACKAGE {
  title: string;
  rate: string;
  minOrderNumber: string;
  discount: string;
  from: string;
  to: string;
}

const MyPackages: React.FC = () => {
  const [packages, setPackages] = useState<string[]>([
    "Online Coaching",
    "Personal Training",
  ]);

  const [OC, setOC] = useState<PACKAGE>({
    title: "",
    rate: "",
    minOrderNumber: "",
    discount: "",
    from: "",
    to: "",
  });

  const [PT, setPT] = useState<PACKAGE>({
    title: "",
    rate: "",
    minOrderNumber: "",
    discount: "",
    from: "",
    to: "",
  });

  //   const [titlePT, setTitlePT] = useState<string>("");
  //   const [ratePT, setRatePT] = useState<string>("");
  //   const [minOrderNumberPT, setMinOrderNumberPT] = useState<string>("");
  //   const [discountPT, setDiscountPT] = useState<string>("");
  //   const [fromPT, setFromPT] = useState<string>("");
  //   const [toPT, setToPT] = useState<string>("");
  //   const [titleOC, setTitleOC] = useState<string>("");
  //   const [rateOC, seRatetOC] = useState<string>("");
  //   const [minOrderNumberOC, setMinOrderNumberOC] = useState<string>("");
  //   const [discountOC, setDiscountOC] = useState<string>("");
  //   const [fromOC, setFromOC] = useState<string>("");
  //   const [toOC, setToOC] = useState<string>("");

  const { userData } = useAuthContext();
  let userId = userData?.userId;

  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`http://localhost:5001/api/coach/${userId}`, {})
        .then(function (response) {
          setOC(response.data.onlineCoaching);
          setPT(response.data.personalTraining);
          console.log(OC);
          console.log(PT);
        })
        .catch(function (error) {
          message.error(error);
        })
        .finally(function () {});
    }
  }, [userData]);

  const [discounts, setDiscounts] = useState<string[]>([]);
  if (OC.discount !== "" && PT.discount !== "") {
    setDiscounts([...discounts, OC.discount]);
    setDiscounts([...discounts, PT.discount]);
  }
  const [images, setImages] = useState<string[]>([OCPhoto, PTPhoto]);
  const { Meta } = Card;

  return (
    <div>
      <Card
        hoverable
        style={{ width: "50%", height: "auto" }}
        cover={
          <img
            style={{ width: "100%", height: "60%" }}
            alt="example"
            src={images[0]}
          />
        }
        // onClick={() => {
        //   if (title === "Online Coaching") {
        //   }
        //   if (title === "#Personal Training") {
        //   }
        // }}
      >
        <Meta title="Online Coaching" description={""} />
      </Card>
      <Card
        hoverable
        style={{ width: "50%", height: "auto" }}
        cover={
          <img
            style={{ width: "100%", height: "60%" }}
            alt="example"
            src={images[1]}
          />
        }
        // onClick={() => {
        //   if (title === "Online Coaching") {
        //   }
        //   if (title === "#Personal Training") {
        //   }
        // }}
      >
        <Meta title="Personal Training" description={""} />
      </Card>
    </div>
  );
};

interface Prop {
  title: string;
  index: number;
}

// FOR CARDS
const CardItem: React.FC<Prop> = ({ title, index }) => {
  const { Meta } = Card;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        hoverable
        style={{ width: "50%", height: "auto" }}
        cover={
          <img
            style={{ width: "100%", height: "60%" }}
            alt="example"
            // src={images[index]}
          />
        }
        // onClick={() => {
        //   if (title === "Online Coaching") {
        //   }
        //   if (title === "#Personal Training") {
        //   }
        // }}
      >
        <Meta title={title} description={""} />
      </Card>
    </div>
  );
};

export default MyPackages;

//  {/* Package details */}
//  <Space
//  style={{
//    width: "100%",
//  }}
//  direction="vertical"
// >
//  <div className="onlineCoaching" id="onlineCoaching">
//    <Typography.Title className="title">Online Coaching</Typography.Title>
//    <Form layout="vertical">
//      <Form.Item label="Title">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Price">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Minimum Order Number">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Discount">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Title">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Title">
//        <Input />
//      </Form.Item>
//    </Form>
//  </div>

//  <div className="personalTraining" id="personalTraining">
//    <Typography.Title>Personal Training</Typography.Title>
//    <Form layout="vertical">
//      <Form.Item label="Title">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Price">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Minimum Order Number">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Discount">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Title">
//        <Input />
//      </Form.Item>
//      <Form.Item label="Title">
//        <Input />
//      </Form.Item>
//    </Form>
//  </div>
// </Space>
