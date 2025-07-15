import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import QuickActionCard from '../components/QuickActionCard.jsx';
import { getFinancialReport } from '../services/api';

/**
 * Tela de Painel (Dashboard) com acesso rápido para o administrador.
 * 
 * Exibe os valores brutos de faturamento da semana e do mês,
 * além de atalhos para as funcionalidades principais do sistema.
 */
function PanelPage() {
    const navigate = useNavigate();

    const [resumo, setResumo] = useState({ semana: 0, mes: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResumo = async () => {
            setLoading(true);
            setError(null);
            try {
                const [semanaRes, mesRes] = await Promise.all([
                    getFinancialReport('SEMANAL'),
                    getFinancialReport('MENSAL')
                ]);

                const semana = semanaRes.data?.faturamentoTotalBruto ?? 0;
                const mes = mesRes.data?.faturamentoTotalBruto ?? 0;

                setResumo({ semana, mes });
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar os dados de faturamento.');
            } finally {
                setLoading(false);
            }
        };

        fetchResumo();
    }, []);

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

            <Box sx={{ height: 56 }} />

            {/* Loading ou erro */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
            ) : (
                <>
                    {/* Cards de resumo financeiro (sem o dia) */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            gap: 2,
                            mb: 8,
                            maxWidth: 800,
                            mx: 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Faturamento da semana */}
                        <Paper
                            sx={{
                                p: 2,
                                backgroundColor: 'var(--color-secondary)',
                                color: '#fff',
                                borderRadius: 2,
                                minWidth: 180,
                                minHeight: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="subtitle2">Ganhos da Semana</Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                                R$ {resumo.semana.toFixed(2)}
                            </Typography>
                        </Paper>

                        {/* Faturamento do mês */}
                        <Paper
                            sx={{
                                p: 2,
                                backgroundColor: 'var(--color-secondary)',
                                color: '#fff',
                                borderRadius: 2,
                                minWidth: 180,
                                minHeight: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="subtitle2">Ganhos do Mês</Typography>
                            <Typography variant="h5" sx={{ mt: 1 }}>
                                R$ {resumo.mes.toFixed(2)}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Título da seção de ações rápidas */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Ações Rápidas
                    </Typography>

                    {/* Grid com atalhos para funcionalidades principais */}
                    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                        <Grid item xs={6} sm={4} md={3}>
                            <QuickActionCard label="Fechar Caixa" to="/fechar-caixa" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <QuickActionCard label="Registrar Gasto" to="/gastos" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <QuickActionCard label="Produtos" to="/produtos" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <QuickActionCard label="Serviços" to="/servicos" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <QuickActionCard label="Funcionários" to="/funcionarios" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <QuickActionCard label="Agenda" to="/" />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
}

export default PanelPage;