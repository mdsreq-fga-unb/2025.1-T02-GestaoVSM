import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import { ArrowDownTrayIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import EmployeeSummarySection from '../components/EmployeeSummarySection';
import RevenueSummarySection from '../components/RevenueSummarySection';

import { getFinancialReport } from '../services/api';

/**
 * Página para fechamento de caixa.
 * 
 * Exibe resumo de faturamento geral e por funcionário,
 * permite alternar entre períodos (semana atual, mês atual),
 * e exportar o extrato financeiro em PDF.
 */
function CloseTillPage() {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [financialData, setFinancialData] = useState(null);

    // Define o tipo de relatório conforme a aba
    const tipoRelatorio = tab === 0 ? 'SEMANAL' : 'MENSAL';

    // Função para buscar dados financeiros do backend
    const fetchFinancialReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getFinancialReport(tipoRelatorio);
            setFinancialData(response.data);
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar dados financeiros.');
        } finally {
            setLoading(false);
        }
    };

    // Recarrega dados sempre que o tipoRelatorio (tab) mudar
    useEffect(() => {
        fetchFinancialReport();
    }, [tipoRelatorio]);

    // Atualiza a aba selecionada
    const handleTabChange = (_, newValue) => setTab(newValue);

    // Monta o objeto de dados para o RevenueSummarySection
    const revenueData = {
        faturamentoTotalBruto: financialData?.faturamentoTotalBruto ?? 0,
        faturamentoTotalLiquido: financialData?.faturamentoTotalLiquido ?? 0,
        lucroFinalBarbearia: financialData?.lucroFinalBarbearia ?? 0,
    };

    // Lista de funcionários para o EmployeeSummarySection
    // Já está no formato esperado (lista de objetos com campos corretos)
    const employees = financialData?.detalhamentoFuncionarios || [];

    return (
        <Box
            className="p-4"
            sx={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                pb: '96px',
                position: 'relative',
                minHeight: '100vh',
            }}
        >
            {/* Botão para voltar */}
            <Box sx={{ position: 'fixed', left: 8, top: 16, zIndex: 100, backgroundColor: 'white', width: '100vw' }}>
                <IconButton
                    aria-label="Voltar para agenda"
                    onClick={() => navigate('/agenda')}
                    sx={{ color: 'var(--color-secondary)' }}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </IconButton>
            </Box>

            {/* Título */}
            <Typography
                aria-label="Fechamento de Caixa"
                sx={{
                    mt: 6,
                    mb: 2,
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
                gutterBottom
            >
                Fechamento de Caixa
            </Typography>

            {/* Abas */}
            <Tabs
                value={tab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="primary"
                variant="fullWidth"
                sx={{ mb: 4 }}
                centered
            >
                <Tab label="Semana atual" sx={{ fontSize: '0.9rem', textTransform: 'none' }} />
                <Tab label="Mês atual" sx={{ fontSize: '0.9rem', textTransform: 'none' }} />
            </Tabs>

            {/* Conteúdo principal: loading, erro ou dados */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            ) : (
                <>
                    <RevenueSummarySection data={revenueData} />
                    <EmployeeSummarySection employees={employees} />
                </>
            )}
        </Box>
    );
}

export default CloseTillPage;