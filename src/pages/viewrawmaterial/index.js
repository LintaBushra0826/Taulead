import React, {useState, useEffect}from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { FormWrapper } from "./index.styled";
import { Badge, Input, Form, InputNumber, Button, Popconfirm, Table, Typography } from "antd";
import Logo from '../../assets/images/logo.png';
// import viewrawmaterialForm from "./components/form";

function viewrawmaterial() {
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const originData = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'itmname',
      width: '25%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      width: '15%',
      editable: true,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      width: '40%',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quan',
      width: '40%',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '40%',
      editable: true,
      render: () => <Badge status="success" text="Finished" />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '40%',
      editable: true,
    },
    {
      title: 'Total Price',
      dataIndex: '',
      width: '40%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className='divform'>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <FormWrapper>
      <div className='Formheading'>Raw Material View</div>
      <Form>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
      </FormWrapper>
      </BodyWrapper>
  </div>
  );
}

export default viewrawmaterial;