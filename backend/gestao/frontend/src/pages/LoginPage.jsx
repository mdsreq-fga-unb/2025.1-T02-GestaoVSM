import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { ScissorsIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula login e exibe Snackbar
    setSnackbarOpen(true);

    // Espera 2.5 segundos e navega para /agenda
    setTimeout(() => {
      navigate('/agenda');
    }, 2500); // tempo igual ao autoHideDuration
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-secondary)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 4,
          gap: 3,
        }}
      >
        <ScissorsIcon className="h-8 w-8 mx-auto text-[var(--color-secondary)]" />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'center',
            mb: 8,
          }}
        >
          Gestão VSM
        </Typography>

        <TextField
          placeholder="Usuário"
          variant="outlined"
          fullWidth
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          inputProps={{ maxLength: 30 }}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        />

        <TextField
          placeholder="Senha"
          variant="outlined"
          type="password"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          inputProps={{ maxLength: 30 }}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: 'var(--color-secondary)',
            color: '#fff',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: 2,
            height: 48,
            marginTop: 4,
            '&:hover': {
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-secondary)',
            },
          }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 2,
            color: 'var(--color-secondary)',
          }}
        >
          Esqueceu a senha?{" "}
          <span
            onClick={() => {}}
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Recupere aqui
          </span>
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '70%' }}
          icon={false}
        >
          Login realizado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginPage;