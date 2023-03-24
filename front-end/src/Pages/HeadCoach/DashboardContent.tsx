import { Card, Col, message, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";

import { MdMoneyOff } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { FcShipped, FcBusinessman } from "react-icons/fc";
import { BsPeople } from "react-icons/bs";

// for charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAuthContext } from "../../Hooks/useAuthContext";
import axios from "axios";

const OCPhoto: string = new URL(`./online-coaching.jpg`, import.meta.url).href;
const PTPhoto: string = new URL(`./personal-Training.jpg`, import.meta.url)
  .href;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AvatarStyle = {
  fontSize: 24,
  color: "green",
  backgroundColor: "rgba(0,255,0,0.25)",
  borderRadius: 20,
  padding: 8,
};

const DISPLAY_SIZES_ROW = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 12, offset: 6 },
  xl: { span: 12, offset: 6 },
};
const DISPLAY_SIZES_COL = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 8, offset: 0 },
  lg: { span: 5, offset: 0 },
  xl: { span: 5, offset: 0 },
};

const DISPLAY_SIZES_ROW_PACKAGE = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 24, offset: 0 },
  xl: { span: 24, offset: 0 },
};
const DISPLAY_SIZES_COL_PACKAGE = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 8, offset: 0 },
  lg: { span: 10, offset: 1 },
  xl: { span: 10, offset: 1 },
};

const DISPLAY_SIZES_COL_DATE_TIME = {
  xs: { span: 24, offset: 0 },
  sm: { span: 24, offset: 0 },
  md: { span: 24, offset: 0 },
  lg: { span: 23, offset: 0 },
  xl: { span: 23, offset: 0 },
};

const { Meta } = Card;

interface Props {
  setSelectedMenu: (value: string) => void;
}
const DashboardContent: React.FC<Props> = ({ setSelectedMenu }) => {
  const { userData } = useAuthContext();
  let userId = userData?.userId;
  const [images, setImages] = useState<string[]>([OCPhoto, PTPhoto]);

  const [totalRevenue, setTotalRevenue] = useState<number>(156234);
  const [totalAlfFee, setTotalAlfFee] = useState<number>(28456);
  const [withdrawableFee, setWithdrawableFee] = useState<number>(56347);
  const [totalOrders, setTotalOrders] = useState<number>(47);
  const [ordersCompleted, setOrdersCompleted] = useState<number>(35);
  const [ordersInProgress, setOrdersInProgress] = useState<number>(12);
  const [myTeam, setMyTeam] = useState<number>(12);

  const [fName, setFName] = useState<string>("Chanaka");
  const [lName, setLName] = useState<string>("");

  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`http://localhost:5001/api/coach/${userId}`, {})
        .then(function (response: any) {
          setFName(response.data.firstName);
          setLName(response.data.lastName);
        })
        .catch(function (error: string) {
          message.error(error);
        })
        .finally(function () {});
    }
  }, [userData]);

  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <Col {...DISPLAY_SIZES_COL_DATE_TIME}>
          <Card
            style={{
              width: "100% ",
              display: "flex",
              justifyContent: "center",
              background: "#d3d3d3",
            }}
          >{`Wellcome ${fName} ${lName}`}</Card>
        </Col>
      </Row>
      {/*Row 1 */}
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
        {...DISPLAY_SIZES_ROW}
      >
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            hoverable
            style={{ background: "#d3d3d3" }}
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<FcSalesPerformance style={AvatarStyle} />}
              title="Sales"
              description={`Rs.${totalRevenue}`}
            />
          </Card>
        </Col>
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            style={{ background: "#d3d3d3" }}
            hoverable
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<MdMoneyOff style={AvatarStyle} />}
              title="Total ALF Fee"
              description={`Rs.${totalAlfFee}`}
            />
          </Card>
        </Col>
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            style={{ background: "#d3d3d3" }}
            hoverable
            actions={[<span>Withdraw</span>]}
          >
            <Meta
              avatar={<GiTakeMyMoney style={AvatarStyle} />}
              title="Available Balance"
              description={`Rs.${withdrawableFee}`}
            />
          </Card>
        </Col>
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            style={{ background: "#d3d3d3" }}
            hoverable
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<FcShipped style={AvatarStyle} />}
              title="Orders"
              description={`Total (${totalOrders})`}
            />
          </Card>
        </Col>

        {/* Row 2 */}

        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            style={{ background: "#d3d3d3" }}
            hoverable
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<FcShipped style={AvatarStyle} />}
              title="Orders"
              description={`In Progress (${ordersInProgress})`}
            />
          </Card>
        </Col>
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            hoverable
            style={{ background: "#d3d3d3" }}
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<FcShipped style={AvatarStyle} />}
              title="Orders"
              description={`Completed (${ordersCompleted})`}
            />
          </Card>
        </Col>
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            style={{ background: "#d3d3d3" }}
            hoverable
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<BsPeople style={AvatarStyle} />}
              title="My Team"
              description={`${myTeam}`}
            />
          </Card>
        </Col>
        <Col {...DISPLAY_SIZES_COL} style={{ marginBottom: "10px" }}>
          <Card
            hoverable
            style={{ background: "#d3d3d3" }}
            onClick={() => {
              setSelectedMenu("clients");
            }}
            actions={[<span>See more</span>]}
          >
            <Meta
              avatar={<FcBusinessman style={AvatarStyle} />}
              title="My Clients"
              description={56}
            />
          </Card>
        </Col>
      </Row>

      {/* ################################################################-----Packages-----######################################################## */}
      <Typography.Title>Packages</Typography.Title>
      <Row {...DISPLAY_SIZES_ROW_PACKAGE}>
        {/* Online Coaching */}
        <Col {...DISPLAY_SIZES_COL_PACKAGE} style={{ marginBottom: "10px" }}>
          <Card
            onClick={() => {
              setSelectedMenu("onlineCoaching");
            }}
            hoverable
            cover={
              <img style={{ height: "60%" }} alt="example" src={images[0]} />
            }
          >
            <Meta title="Online Coaching" description={""} />
          </Card>
        </Col>{" "}
        {/* Personal Training */}
        <Col {...DISPLAY_SIZES_COL_PACKAGE} style={{ marginBottom: "10px" }}>
          <Card
            onClick={() => {
              setSelectedMenu("personalTraining");
            }}
            hoverable
            cover={
              <img
                style={{ width: "100%", height: "60%" }}
                alt="example"
                src={images[1]}
              />
            }
          >
            <Meta title="Personal Training" description={""} />
          </Card>
        </Col>
      </Row>
      {/* <Row {...DISPLAY_SIZES_ROW}>
        <DataChart />
      </Row> */}

      {/* Statistics */}
    </div>
  );
};

const DataChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Orders",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Total",
        data: labels.map(() => Math.random() * 1000),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Completed",
        data: labels.map(() => Math.random() * 1000),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      //   {
      //     label: "In progress",
      //     data: labels.map(() => Math.random() * 500),
      //     borderColor: "rgb(46, 233, 34)",
      //     backgroundColor: "rgba(53, 162, 235, 0.5)",
      //   },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

//

export default DashboardContent;
