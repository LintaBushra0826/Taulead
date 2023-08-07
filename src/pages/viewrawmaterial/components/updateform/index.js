import React, { useState, useEffect } from "react";
import { Input, Form, Button, Divider } from "antd";

function UpdateForm({ initialFormData  }) {
  const [formData, setFormData] = useState({initialFormData});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
            <Form.Item
              label="Item Name"
              name="Name"
            >
              <Input name="Name" value={initialFormData.Name} onChange={handleInputChange} />
            </Form.Item>
    
            <Form.Item label="Item Description" name="Desc">
              <Input name="Desc" value={initialFormData.Desc} onChange={handleInputChange} />
            </Form.Item>
    
            <Form.Item label="Item Unit" name="unit">
              <Input name="unit" value={initialFormData.unit} onChange={handleInputChange} />
            </Form.Item>
    
            <Form.Item label="Item Quantity" name="quan">
              <Input name="quan" value={initialFormData.quan} onChange={handleInputChange} />
            </Form.Item>
         
            <Form.Item label="Item Expiry Date" name="expdate">
              <Input name="expdate" value={initialFormData.expdate} onChange={handleInputChange} />
            </Form.Item>
          
            <Form.Item label="Item Price" name="price">
              <Input name="price" value={initialFormData.price} onChange={handleInputChange} />
            </Form.Item>
         
        </Form>
    </>
  );
}
export default UpdateForm;
