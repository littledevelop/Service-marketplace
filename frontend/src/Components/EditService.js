import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/services/${id}`);
        const serviceData = response.data;
        console.log(serviceData.data)
        form.setFieldsValue({
          title: serviceData.data.title,
          description: serviceData.data.description,
          price:serviceData.data.price
        });
      } catch (error) {
        console.error('Error:', error);
        message.error('Error fetching service details');
      }
    };

    fetchService();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/services/${id}`, values);
      message.success('Service updated successfully!');
      navigate('/services');
    } catch (error) {
      console.error('Error:', error);
      message.error('Error updating service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Card title={<h2 style={{ textAlign: 'center', margin: 0 }}>Edit Service</h2>}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
            <Input placeholder="Enter service title" />
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
              style={{ width: '100%' }}
              prefix="₹"
              min={0}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update Service
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditService;
