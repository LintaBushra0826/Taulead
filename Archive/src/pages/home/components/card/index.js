import React from 'react';
import { Card } from 'antd';
import { BodyWrapper } from './index.styled';
import rawmaterial from "../../../../assets/images/RawMaterial.jpg";
import humanresource from "../../../../assets/images/HumanResource.jpg";
import process from "../../../../assets/images/process.jpg";
import stats from "../../../../assets/images/Statistics.jpg";
import report from "../../../../assets/images/reports.jpg";

function Cards () {
  const { Meta } = Card;
  return (
    <BodyWrapper> 
    <Card
        hoverable
        style={{
          width: 400,
          height: 400,
          marginRight: 30,
        }}
        cover={<img alt="rawmaterial" src={rawmaterial} />}
      >
        <Meta title="Raw Material" description="Maintain your inventory record according to your business" />
    </Card>

    <Card
      hoverable
      style={{
        width: 400,
        height: 400,
        marginRight: 30,
      }}
      cover={<img alt="humanresource" src={humanresource} />}
    >
      <Meta title="Human Resource" description="Manage your own human resources" />
    </Card>

    <Card
      hoverable
      style={{
        width: 400,
        height: 400,
        marginRight: 30,
      }}
      cover={<img alt="process" src={process} />}
    >
      <Meta title="Process Management" description="Manage your business processes" />
    </Card>

    <Card
      hoverable
      style={{
        width: 400,
        height: 400,
        marginRight: 30,
        marginTop: 20,
      }}
      cover={<img alt="statistics" src={stats} />}
    >
      <Meta title="Statistics Management" description="Check your daily working in the form of charts" />
    </Card>

    <Card
      hoverable
      style={{
        width: 400,
        height: 400,
        marginRight: 30,
        marginTop: 20,
      }}
      cover={<img alt="report" src={report} />}
    >
      <Meta title="Reports & Logs" description="Maintain your business reports and logs" />
    </Card>
    </BodyWrapper>
  );
}
export default Cards;