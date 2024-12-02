import { Button, Form, Select, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CurrencyInput } from '../../CurrencyInput';
import { useAppDispatch } from '../../../store/hooks';
import { updateOnSaved } from '../../../store/slices/formgranaflow';
import './styles.css';

const { Option } = Select;

const FormGranaFlow: React.FC = () => {
  const [tiposCustos, setTiposCustos] = useState<string[]>([]);
  const [tipoCustoSelecionado, setTipoCustoSelecionado] = useState<string | undefined>(undefined);
  const [valorCusto, setValorCusto] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleTiposCustos = () => {
    axios.get('http://localhost:8080/grana-flow/api/v1/lancamentos/tipos-custos')
      .then(response => {
        setTiposCustos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar tipos de custos:", error);
        message.error("Erro ao buscar tipos de custos");
      });
  }

  const handleTipoCustoChange = (value: string) => {
    setTipoCustoSelecionado(value);
  };

  const handleValorCustoChange = (value: string) => {
    setValorCusto(value);
  };

  const handleSubmit = () => {
    const valorCustoNumber = parseFloat(valorCusto.replace(/[^0-9,]/g, '').replace(',', '.'));

    axios.post('http://localhost:8080/grana-flow/api/v1/lancamentos', {
      valorCusto: valorCustoNumber,
      tipoCusto: tipoCustoSelecionado
    })
      .then(response => {
        message.success('Lançamento salvo com sucesso!');
        dispatch(updateOnSaved(true));
        // Limpar o formulário após o envio com sucesso
        setTipoCustoSelecionado(undefined);
        setValorCusto('');
      })
      .catch(error => {
        console.error("Erro ao salvar lançamento:", error);
        message.error("Erro ao salvar lançamento");
      });
  };

  useEffect(() => {
    handleTiposCustos();
  }, []);

  return (
    <Form className="flex-item-form" layout="vertical" onFinish={() => handleSubmit()}>
      <Form.Item label="Tipo de Custo">
        <Select placeholder="Selecione o tipo de custo" onChange={(e) => handleTipoCustoChange(e)} value={tipoCustoSelecionado}>
          {tiposCustos.map(tipoCusto => (
            <Option key={tipoCusto} value={tipoCusto}>{tipoCusto}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Valor do Custo">
        <CurrencyInput value={valorCusto} onChange={(e) => handleValorCustoChange(e)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormGranaFlow;