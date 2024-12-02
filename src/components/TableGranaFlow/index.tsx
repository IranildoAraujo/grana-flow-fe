import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { Lancamento } from '../dto/lancamento-dto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateLancamento, updateError } from '../../store/slices/lancamento';
import './styles.css';

const TableGranaFlow: React.FC = () => {
    const API_URL = 'http://localhost:8080/grana-flow/api/v1/lancamentos';

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

    const dispatch = useAppDispatch();
    const { onSaved } = useAppSelector((state) => state.formGranaFlowStore);

    const buscarLancamentos = useCallback(async () => {
        try {
            const response = await axios.get<Lancamento[]>(API_URL);
            const lancamentos = response.data.map(l => ({
                ...l,
                ultimoCustoRegistrado: new Date(l.ultimoCustoRegistrado) // Converte para Date
            })) as Lancamento[];
            setLancamentos(lancamentos);
            dispatch(updateLancamento(lancamentos));
        } catch (error) {
            dispatch(updateError("Erro ao buscar dados da API."));
        }
    }, [dispatch]);

    const columns: ColumnsType<Lancamento> = [
        {
            title: 'Tipo de Custo',
            dataIndex: 'tipoCusto',
            key: 'tipoCusto',
        },
        {
            title: 'Valor do Custo',
            dataIndex: 'valorCusto',
            key: 'valorCusto',
            render: (valorCusto: number) => `R$ ${valorCusto.toFixed(2)}`, // Formatar valor
        },
        {
            title: 'Data do Lançamento',
            dataIndex: 'ultimoCustoRegistrado',
            key: 'ultimoCustoRegistrado',
            render: (data: Date) => data.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }), // Formatar data
        },
    ];

    useEffect(() => {
        buscarLancamentos();
    }, [onSaved, buscarLancamentos]);

    return (
        <Table
            className="flex-table"
            dataSource={lancamentos}
            columns={columns}
            rowKey={(lancamento) => lancamento.id?.toString() || Math.random().toString()} // Correção rowKey
            pagination={false} // Remova paginação, se necessário
        />
    );
};

export default TableGranaFlow;