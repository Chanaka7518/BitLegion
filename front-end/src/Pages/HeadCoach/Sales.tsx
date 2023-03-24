import { Space } from "antd";
import React from "react";
import SalesContent from "../../components/HeadCoach/SalesContent";
import SideMenu from "../../components/HeadCoach/SideMenu";

const Sales = () => {
  return (
    <div>
      <Space>
        <SideMenu />
        <SalesContent />
      </Space>
    </div>
  );
};

export default Sales;
