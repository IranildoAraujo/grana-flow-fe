import React, { useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import FinancialGPT from '../../components/FinancialGPT';
import FormGranaFlow from '../../components/Form/FormGranaFlow';
import TableGranaFlow from '../../components/TableGranaFlow';
import { useAuth } from '../../context/AuthContext';
import './styles.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const GranaFlow: React.FC = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const siderWidth = 400;

  return (
    <Layout className="flex-container-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={collapsed ? 100 : siderWidth}
        className="sider"
      >
        <div style={{ display: collapsed ? 'none' : 'block' }}>
          <FinancialGPT />
        </div>
      </Sider>

      <Layout className="flex-layout-header">

        <Header className="flex-header">
          <Title className="flex-header-title" level={2}>
            <DollarOutlined className="flex-dollar" />
            Grana-Flow
          </Title>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </Header>

        <Content className="flex-content" style={{ marginLeft: collapsed ? 100 : siderWidth }}>
          <Title level={2}>Lançamentos</Title>
          <FormGranaFlow />
          <TableGranaFlow />
        </Content>

      </Layout>

    </Layout>
  );
};

export default GranaFlow;