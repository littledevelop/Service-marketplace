import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/services', values);
      if (response.data.status === 'success') {
        message.success('Service added successfully!');
        navigate('/services');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Card 
        title={<h2 style={{ textAlign: 'center', margin: 0 }}>Add New Service</h2>}
      >
        <Form
          name="addService"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input service title!',
              },
            ]}
          >
            <Input 
              placeholder="Enter service title"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input service description!',
              },
            ]}
          >
            <Input.TextArea 
              placeholder="Enter service description"
              size="large"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input service price!',
              },
              {
                type: 'number',
                min: 0,
                message: 'Price must be greater than or equal to 0!',
              },
            ]}
          >
            <InputNumber
              placeholder="Enter price"
              size="large"
              style={{ width: '100%' }}
              prefix="₹"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<PlusOutlined />}
              size="large"
              loading={loading}
              block
            >
              Add Service
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddService;
