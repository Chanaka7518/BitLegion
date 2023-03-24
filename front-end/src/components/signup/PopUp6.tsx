import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Modal, DatePicker } from "antd";
import { PlusSquareTwoTone } from "@ant-design/icons";
import "./style.css";
import type { DatePickerProps } from "antd";

interface PACKAGE {
  title: string;
  rate: string;
  minOrderNumber: string;
  discount: string;
  from: string;
  to: string;
}

interface Props {
  visible6: boolean;
  handleNext6: () => void;
  handleCancel6: (values: any) => void;
  handleprevious6: (values: any) => void;
  onFinish: (value1: PACKAGE, value2: PACKAGE) => void;
}

const Services: React.FC<Props> = ({
  visible6,
  handleNext6,
  handleprevious6,
  handleCancel6,
  onFinish,
}) => {
  const [form] = Form.useForm();

  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [isClickedPlus1, setIsClickedPlus1] = useState<boolean>(false);
  const [isClickedPlus2, setIsClickedPlus2] = useState<boolean>(false);
  const [titlePT, setTitlePT] = useState<string>("");
  const [titleOC, setTitleOC] = useState<string>("");
  const [ratePT, setRatePT] = useState<string>("");
  const [rateOC, setRateOC] = useState<string>("");
  const [minOrderPT, setMinOrderPT] = useState<string>("");
  const [minOrderOC, setMinOrderOC] = useState<string>("");
  const [discountPT, setDiscountPT] = useState<string>("");
  const [discountOC, setDiscountOC] = useState<string>("");
  const [fromPT, setFromPT] = useState<string>("");
  const [toPT, setToPT] = useState<string>("");
  const [fromOC, setFromOC] = useState<string>("");
  const [toOC, setToOC] = useState<string>("");
  // let formData1: string[] = [];
  // let formData2: string[] = [];
  // let packages: string[][] = [];

  let PersonalTraining: PACKAGE;
  let OnlineCoaching: PACKAGE;

  const finalSubmit = () => {
    form.submit();
    PersonalTraining = {
      title: titlePT,
      rate: ratePT,
      minOrderNumber: minOrderPT,
      discount: discountPT,
      from: fromPT,
      to: toPT,
    };
    OnlineCoaching = {
      title: titleOC,
      rate: rateOC,
      minOrderNumber: minOrderOC,
      discount: discountOC,
      from: fromOC,
      to: toOC,
    };
    onFinish(PersonalTraining, OnlineCoaching);

    handleNext6();
  };

  return (
    <Modal
      title="Sign Up"
      open={visible6}
      onCancel={handleCancel6}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            htmlType="submit"
            type="primary"
            onClick={finalSubmit}
          >
            Next
          </Button>
        </Form.Item>,
        <Form.Item>
          <Button
            style={{ width: "100%", color: "#8794fa", borderColor: "#8794fa" }}
            danger={true}
            onClick={handleprevious6}
          >
            Back
          </Button>
          ,
        </Form.Item>,
      ]}
    >
      <h1>Services you offer</h1>
      <div className="text-container">
        <p className="text-note">
          These services will be displayed in to your audience.Select the
          services you provide
        </p>
      </div>

      <Form form={form} layout="vertical">
        {/* first */}
        <div
          className="item-1"
          style={{ backgroundColor: isChecked1 ? "#e9ecef" : "white" }}
          onClick={() => {
            setIsChecked1(!isChecked1);
            if (isChecked1) {
              setIsClickedPlus1(false);
            }
          }}
        >
          <div className="options">Personal training</div>
          <input
            type="checkbox"
            className="c-box"
            checked={isChecked1 ? true : false}
            onChange={() => {
              setIsChecked1(!isChecked1);
              if (isChecked1) {
                setIsClickedPlus1(false);
              }
            }}
          />
        </div>
        {isChecked1 && (
          <div className="first-tick">
            <PlusSquareTwoTone
              className="plus-btn"
              onClick={() => setIsClickedPlus1(!isClickedPlus1)}
            />
            <p
              onClick={() => setIsClickedPlus1(!isClickedPlus1)}
              className="package-name-paragraph"
            >
              Create personal training package
            </p>
          </div>
        )}
        {isClickedPlus1 && isChecked1 && (
          <div>
            <Form.Item
              name="titlePT"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Enter Your Title",
                },
              ]}
            >
              <Input
                className="pkg-input"
                onChange={(e) => {
                  setTitlePT(e.target.value);
                }}
                value={titlePT}
              />
            </Form.Item>

            <Form.Item
              name="ratePT"
              label={`Rate per session(Rs.)`}
              rules={[
                {
                  pattern: /^\d+$/,
                  message: "Please enter numbers only",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setRatePT(e.target.value);
                }}
                value={ratePT}
              />
            </Form.Item>

            <Form.Item
              name="MinOrderPT"
              label="Minimum order number"
              rules={[
                {
                  pattern: /^\d+$/,
                  message: "Please enter numbers only",
                },
              ]}
            >
              <Input
                className="pkg-input"
                onChange={(e) => {
                  setMinOrderPT(e.target.value);
                }}
                value={minOrderPT}
              />
            </Form.Item>

            <Form.Item
              name="discount"
              label={`Discount(%)`}
              rules={[
                {
                  pattern: /^(100|[1-9]?[0-9])$/,
                  message: "Please enter a number between 0 and 100",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setDiscountPT(e.target.value);
                }}
                value={discountPT}
              />
            </Form.Item>
            <div className="dates">
              <div className="date-1">
                <Form.Item name="fromPT" label="From">
                  <DatePicker
                    format="YYYY/MM/DD"
                    onChange={(date, dateString) => {
                      setFromPT(dateString);
                    }}
                  />
                </Form.Item>
              </div>
              <div className="date-1">
                <Form.Item name="toPT" label="To">
                  <DatePicker
                    format="YYYY/MM/DD"
                    onChange={(date, dateString) => {
                      setToPT(dateString);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        )}

        {/* second */}
        <div
          className="item-1"
          style={{ backgroundColor: isChecked2 ? "#e9ecef" : "white" }}
          onClick={() => {
            setIsChecked2(!isChecked2);
            if (isChecked2) {
              setIsClickedPlus2(false);
            }
          }}
        >
          <div className="options">Online Coaching </div>
          <input
            type="checkbox"
            className="c-box"
            checked={isChecked2 ? true : false}
            onChange={() => {
              setIsChecked2(!isChecked2);
              if (isChecked2) {
                setIsClickedPlus2(false);
              }
            }}
          />
        </div>
        {isChecked2 && (
          <div className="first-tick">
            <PlusSquareTwoTone
              className="plus-btn"
              onClick={() => setIsClickedPlus2(!isClickedPlus2)}
            />
            <p
              onClick={() => setIsClickedPlus2(!isClickedPlus2)}
              className="package-name-paragraph"
            >
              Create online coaching package
            </p>
          </div>
        )}
        {isClickedPlus2 && isChecked2 && (
          <div>
            <div className="inputs">
              <Form.Item name="titleOC" label="Title">
                <Input
                  onChange={(e) => {
                    setTitleOC(e.target.value);
                  }}
                  value={titleOC}
                />
              </Form.Item>

              <Form.Item
                name="rateOC"
                label={`Rate per session(Rs.)`}
                rules={[
                  {
                    pattern: /^\d+$/,
                    message: "Please enter numbers only",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setRateOC(e.target.value);
                  }}
                  value={rateOC}
                />
              </Form.Item>

              <Form.Item
                name="MinOrderOC"
                label="Minimum order number"
                rules={[
                  {
                    pattern: /^\d+$/,
                    message: "Please enter numbers only",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setMinOrderOC(e.target.value);
                  }}
                  value={minOrderOC}
                />
              </Form.Item>

              <Form.Item
                name="discountOC"
                label={`Discount(%)`}
                rules={[
                  {
                    pattern: /^(100|[1-9]?[0-9])$/,
                    message: "Please enter a number between 0 and 100",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setDiscountOC(e.target.value);
                  }}
                  value={discountOC}
                />
              </Form.Item>

              <div className="dates">
                <div className="date-1">
                  <Form.Item name="fromOC" label="From">
                    <DatePicker
                      format="YYYY/MM/DD"
                      onChange={(date, dateString) => {
                        setFromOC(dateString);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="date-1">
                  <Form.Item name="toOC" label="To">
                    <DatePicker
                      format="YYYY/MM/DD"
                      onChange={(date, dateString) => {
                        setToOC(dateString);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              {/*  should add description */}
            </div>
          </div>
        )}
      </Form>
    </Modal>
  );
};
export default Services;
