import React, { useEffect, useState } from "react";
import { Table, Button, Card, message, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const { Search } = Input;

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api/services";

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      message.error("Error fetching services: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Service deleted successfully!');
      fetchServices();
    } catch (error) {
      message.error("Error deleting service: " + error.message);
    }
  };

  // Search functionality
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredServices = services.filter((service) => 
    service.title.toLowerCase().includes(searchText.toLowerCase()) ||
    service.description.toLowerCase().includes(searchText.toLowerCase()) ||
    service.price.toString().includes(searchText)
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      filteredValue: [searchText],
      onFilter: (value, record) => (
        record.title.toLowerCase().includes(value.toLowerCase()) ||
        record.description.toLowerCase().includes(value.toLowerCase()) ||
        record.price.toString().includes(value)
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/edit-service/${record.id}`)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Card
        title={<h2 style={{ margin: 0 }}>Service List</h2>}
        extra={
          <Space>
            <Search
              placeholder="Search services..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate('/add-service')}
            >
              Add Service
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredServices}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} services`,
          }}
        />
      </Card>
    </div>
  );
};

export default Services;
