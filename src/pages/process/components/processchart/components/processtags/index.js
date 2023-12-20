import React from 'react'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import { TagWrapper } from './index.styled';

function ProcessTags({ status }) {
  let tagColor, tagName, tagIcon;

  if (status === "paused") {
    tagColor = "#F1EFEF";
    tagName = "Backlog";
    tagIcon = <MinusCircleOutlined />;
  } else if (status === "inprogress") {
    tagColor = "inprogress";
    tagName = "In Progress";
    tagIcon = <SyncOutlined spin />;
  } else if (status === "completed") {
    tagColor = "completed";
    tagName = "Completed";
    tagIcon = <CheckCircleOutlined />;
  } else {
    // Handle other status values or provide a default
    tagColor = "default";
    tagName = "Not Started Yet";
    tagIcon = <ClockCircleOutlined />;
  }

  return (
    <TagWrapper>
      <Tag icon={tagIcon} color={tagColor} style={{color:"black", fontWeight:"bold"}}>
        {tagName.toUpperCase()}
      </Tag>
    </TagWrapper>
  );
}


export default ProcessTags;
