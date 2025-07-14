// src/components/QuickActionCard.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function QuickActionCard({ label, to }) {
    const navigate = useNavigate();

    return (
        <Paper
            onClick={() => navigate(to)}
            sx={{
                p: 2,
                width: '100%',
                minHeight: 100,
                minWidth: 165,
                position: 'relative',
                borderRadius: 2,
                cursor: 'pointer',
                bgcolor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    bgcolor: 'var(--color-secondary)',
                    color: 'var(--color-primary)',
                },
                userSelect: 'none',
            }}
            elevation={3}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navigate(to);
                }
            }}
        >
            <Typography sx={{ fontWeight: 500, userSelect: 'none' }}>{label}</Typography>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    color: 'inherit', 
                    transition: 'color 0.2s ease-in-out',

                    '.MuiPaper-root:hover &': {
                        color: 'var(--color-accent)',
                    },
                }}
            >
                <ChevronRightIcon className="h-4 w-4" />
            </Box>
        </Paper>
    );
}

export default QuickActionCard;
