import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    IconButton,
} from '@mui/material';
import { ArrowDownTrayIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import EmployeeSummarySection from '../components/EmployeeSummarySection';
import RevenueSummarySection from '../components/RevenueSummarySection';
import PrimaryActionButton from '../components/PrimaryActionButton';
import ExportConfirmationModal from '../modals/ExportConfirmationModal';

/**
 * Página para fechamento de caixa.
 * 
 * Exibe resumo de faturamento geral e por funcionário,
 * permite alternar entre períodos (semana atual, mês atual, personalizado),
 * e exportar o extrato financeiro em PDF.
 * 
 * Props:
 * - employees (array): lista dos funcionários com seus dados financeiros.
 */
function CloseTillPage({ employees = [] }) {
    const navigate = useNavigate(); // Hook para navegação no histórico do react-router
    const [tab, setTab] = useState(0); // Estado para controle da aba selecionada
    const [exportModalOpen, setExportModalOpen] = useState(false); // Estado para controle do modal de exportação

    // Atualiza a aba selecionada
    const handleTabChange = (_, newValue) => setTab(newValue);

    // Abre o modal de exportação
    const handleExportClick = () => setExportModalOpen(true);

    // Fecha o modal de exportação
    const handleCloseModal = () => setExportModalOpen(false);

    // Ação ao confirmar exportação: log e fechar modal
    const handleConfirmExport = () => {
        console.log('Exportar PDF do período selecionado');
        handleCloseModal();
    };

    // Define o texto do período selecionado com base na aba ativa
    const periodoSelecionado = {
        label:
            tab === 0
                ? 'Semana Atual'
                : tab === 1
                    ? 'Mês Atual'
                    : '01/06/2025 a 15/06/2025',
    };

    // Calcula o resumo de receita somando os valores dos funcionários
    const revenueData = employees.reduce(
        (acc, emp) => ({
            servicesTotal: acc.servicesTotal + emp.servicesTotal,
            commissionsTotal: acc.commissionsTotal + emp.commissions,
            productsTotal: acc.productsTotal,
        }),
        { servicesTotal: 0, commissionsTotal: 0, productsTotal: 0 }
    );

    return (
        <Box
            className="p-4"
            sx={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                pb: '96px', // espaço extra para o footer fixo
                position: 'relative',
            }}
        >
            {/* Botão para voltar à página anterior */}
            <Box sx={{ position: 'absolute', left: 8, top: 8, zIndex: 1 }}>
                <IconButton
                    aria-label="Voltar para agenda"
                    onClick={() => navigate(-1)}
                    sx={{ color: 'var(--color-secondary)' }}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </IconButton>
            </Box>

            {/* Título da página */}
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

            {/* Abas para seleção do período */}
            <Tabs
                value={tab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="primary"
                sx={{ mb: 4 }}
                centered
            >
                <Tab label="Semana atual" sx={{ fontSize: '0.9rem', textTransform: 'none' }} />
                <Tab label="Mês atual" sx={{ fontSize: '0.9rem', textTransform: 'none' }} />
                <Tab label="Personalizado" sx={{ fontSize: '0.9rem', textTransform: 'none' }} />
            </Tabs>

            {/* Componente que exibe resumo financeiro total */}
            <RevenueSummarySection data={revenueData} />

            {/* Componente que exibe resumo financeiro por funcionário */}
            <EmployeeSummarySection employees={employees} />

            {/* Footer fixo com botão para exportar extrato */}
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

            {/* Modal de confirmação de exportação */}
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