import React, { useState } from 'react';
import { Layout, Input, Button, List, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './styles.css'; // Import a stylesheet for additional styling if needed

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage, { role: 'assistant', content: 'Resposta gerada pelo ChatGPT.' }]);
    setInput('');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ background: '#001529', color: 'white', textAlign: 'center', padding: '10px 20px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>ChatGPT Layout</h1>
      </Header>

      <Content style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
          <List
            dataSource={messages}
            renderItem={(message, index) => (
              <List.Item
                key={index}
                style={{
                  textAlign: message.role === 'user' ? 'right' : 'left',
                }}
              >
                <Text strong={message.role === 'user'}>{message.content}</Text>
              </List.Item>
            )}
          />
        </div>
      </Content>

      <Footer style={{ padding: '10px', display: 'flex', gap: '10px', background: '#f0f0f0' }}>
        <Input
          placeholder="Digite sua mensagem"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSendMessage}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage}>
          Enviar
        </Button>
      </Footer>
    </Layout>
  );
};

export default ChatGPT;
