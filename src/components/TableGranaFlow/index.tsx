import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { Lancamento } from '../dto/lancamento-dto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateLancamento, updateError } from '../../store/slices/lancamento';
import { useAuthenticatedHttpClient } from '../../hooks';
import './styles.css';
import { API_BASE_URL } from '../../util/URLUtil/URLUtil';

const TableGranaFlow: React.FC = () => {
    const httpClient = useAuthenticatedHttpClient();

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

    const dispatch = useAppDispatch();
    const { onSaved } = useAppSelector((state) => state.formGranaFlowStore);

    const buscarLancamentos = useCallback(async () => {
        try {
            const response = await httpClient.get<Lancamento[]>(`${API_BASE_URL}/lancamentos`);
            const lancamentos = response.data.map(l => ({
                ...l,
                dataRegistro: new Date(l.dataRegistro) // Converte para Date
            })) as unknown as Lancamento[];
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
            dataIndex: 'dataRegistro',
            key: 'dataRegistro',
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