import './App.css';
import Services from './Components/Services';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddService from './Components/AddService';
import EditService from './Components/EditService';
import { Layout, ConfigProvider } from 'antd';

const { Content } = Layout;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Services />
    },
    {
      path: "/services",
      element: <Services />
    },
    {
      path: "/add-service",
      element: <AddService />
    },
    {
      path: "/edit-service/:id",
      element: <EditService />
    }
  ]);

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content>
          <RouterProvider router={router} />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
