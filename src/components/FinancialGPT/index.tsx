import React, { useState } from 'react';
import { Layout, Input, Button, List, Typography, Tooltip } from 'antd';
import { CopyOutlined, SendOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import { answerPtBr, templatePtBr2 } from '../../util/TemplateUtil';
import { applyPromptTemplateWithTools, createModelProvider, PromptTemplate } from '../../util/ModelProvider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './styles.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FinancialGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const { lancamentos } = useAppSelector((state) => state.lancamentoStore);

  const financialData = lancamentos.map(item => {
    return `${item.tipoCusto}: R$${item.valorCusto.toFixed(2)} registrado em ${new Date(
      item.dataRegistro
    ).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}`
  }).join("\n");

  const modelConfig = {
    model: "Qwen/Qwen2.5-Coder-32B-Instruct",
    temperature: 0.1,
    top_p: 0.95, // Reduzir diversidade
    top_k: 40, // Priorizar termos relevantes
    maxNewTokens: 250,
    returnFullText: false,
    verbose: false,
  };

  const callModel = createModelProvider(modelConfig);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const promptTemplate: PromptTemplate = {
      template: templatePtBr2,
      variables: {
        input: input,
        financial_data: financialData,
        answer: answerPtBr,
      },
    };

    const prompt = await applyPromptTemplateWithTools(
      promptTemplate.template,
      promptTemplate.variables
    );

    const { result, logs } = await callModel(prompt);

    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage, { role: 'assistant', content: `${result}`}]);
    setInput('');
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard!');
    });
  };

  return (
    <Layout style={{ height: '88vh' }}>
      <Header style={{ background: '#001529', color: 'white', textAlign: 'center', padding: '10px 20px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Assistente Financeiro</h1>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start', gap: '10px' }}>
                  {message.role === 'assistant' && (
                    <Tooltip title="Copiar resposta">
                      <Button
                        icon={<CopyOutlined />}
                        size="small"
                        onClick={() => handleCopyToClipboard(message.content)}
                      />
                    </Tooltip>
                  )}
                  {message.role === 'assistant' ? (
                    <div
                      className="markdown-content"
                      style={{ maxWidth: '80%', textAlign: 'left', padding: '10px', backgroundColor: '#f6f8fa', borderRadius: '5px' }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    </div>

                  ) : (
                    <Text strong={message.role === 'user'}>{message.content}</Text>
                  )}
                </div>
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
          onPressEnter={() => handleSendMessage()}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={() => handleSendMessage()}>
          Enviar
        </Button>
      </Footer>
    </Layout>
  );
};

export default FinancialGPT;
