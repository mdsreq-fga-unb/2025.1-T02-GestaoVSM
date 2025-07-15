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
import PrimaryActionButton from '../components/PrimaryActionButton';
import ExportConfirmationModal from '../modals/ExportConfirmationModal';

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
    const [exportModalOpen, setExportModalOpen] = useState(false);
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
            console.log('Dados financeiros recebidos:', response.data);
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

    // Exportação (a implementar)
    const handleExportClick = () => setExportModalOpen(true);
    const handleCloseModal = () => setExportModalOpen(false);
    const handleConfirmExport = () => {
        console.log('Exportar PDF do período selecionado:', periodoSelecionado.label);
        handleCloseModal();
    };

    // Texto do período baseado na aba
    const periodoSelecionado = {
        label: tab === 0 ? 'Semana Atual' : 'Mês Atual',
    };

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

            {/* Footer fixo */}
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-primary)',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    padding: '12px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 10,
                }}
            >
                <PrimaryActionButton icon={ArrowDownTrayIcon} onClick={handleExportClick}>
                    Exportar extrato
                </PrimaryActionButton>
            </Box>

            {/* Modal de exportação */}
            <ExportConfirmationModal
                open={exportModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmExport}
                selectedPeriod={periodoSelecionado.label}
            />
        </Box>
    );
}

export default CloseTillPage;