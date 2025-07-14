// src/pages/PainelPage.jsx
import React from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import QuickActionCard from '../components/QuickActionCard.jsx';

/**
 * Tela de Painel (Dashboard) com acesso rápido para o administrador.
 * 
 * Exibe os valores brutos de faturamento do dia, da semana e do mês,
 * além de atalhos para as funcionalidades principais do sistema.
 */
function PanelPage() {
    const navigate = useNavigate();

    // Valores simulados de faturamento (mock)
    const resumo = {
        dia: 320.00,
        semana: 1780.00,
        mes: 5400.00,
    };

    return (
        <Box
            className="p-4 mt-8"
            sx={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                minHeight: '100vh',
            }}
        >
            {/* Botão para voltar à tela anterior */}
            <Box sx={{ position: 'fixed', left: 8, top: 16, zIndex: 100, backgroundColor: 'white', borderRadius: 1 }}>
                <IconButton
                    aria-label="Voltar"
                    onClick={() => navigate(-1)}
                    sx={{ color: 'var(--color-secondary)' }}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </IconButton>
            </Box>

            {/* Espaço para evitar sobreposição do botão fixo */}
            <Box sx={{ height: 56 }} />

            {/* Cards de resumo financeiro */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    gap: 2,
                    mb: 8,
                    maxWidth: 1000,
                    mx: 'auto',
                    justifyContent: 'center',
                }}
            >
                {/* Faturamento do dia */}
                <Box sx={{ flex: 1, minWidth: 165 }}>
                    <Paper
                        sx={{
                            p: 2,
                            backgroundColor: 'var(--color-secondary)',
                            color: '#fff',
                            borderRadius: 2,
                            minHeight: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="subtitle2">Ganhos de Hoje</Typography>
                        <Typography variant="h5" sx={{ mt: 1 }}>
                            R$ {resumo.dia.toFixed(2)}
                        </Typography>
                    </Paper>
                </Box>

                {/* Faturamento da semana e do mês (empilhados) */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        minWidth: 165
                    }}
                >
                    <Paper
                        sx={{
                            p: 2,
                            backgroundColor: 'var(--color-secondary)',
                            color: '#fff',
                            borderRadius: 2,
                            minHeight: 85,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Typography variant="subtitle2">Ganhos da Semana</Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            R$ {resumo.semana.toFixed(2)}
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            backgroundColor: 'var(--color-secondary)',
                            color: '#fff',
                            borderRadius: 2,
                            minHeight: 85,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Typography variant="subtitle2">Ganhos do Mês</Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            R$ {resumo.mes.toFixed(2)}
                        </Typography>
                    </Paper>
                </Box>
            </Box>

            {/* Título da seção de ações rápidas */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Ações Rápidas
            </Typography>

            {/* Grid com atalhos para funcionalidades principais */}
            <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <QuickActionCard label="Fechar Caixa" to="/fechar-caixa" />
                </Grid>
                <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <QuickActionCard label="Registrar Gasto" to="/gastos" />
                </Grid>
                <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <QuickActionCard label="Produtos" to="/produtos" />
                </Grid>
                <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <QuickActionCard label="Serviços" to="/servicos" />
                </Grid>
                <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <QuickActionCard label="Funcionários" to="/funcionarios" />
                </Grid>
                <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <QuickActionCard label="Agenda" to="/" />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PanelPage;
