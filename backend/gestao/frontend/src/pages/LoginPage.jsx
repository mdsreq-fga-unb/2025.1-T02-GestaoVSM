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
import { login as loginRequest } from '../services/api';

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest({ login, password });
      const token = response.data.token;

      localStorage.setItem('token', token);

      setSnackbarMessage("Login realizado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/agenda');
      }, 1500);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Erro ao fazer login. Verifique suas credenciais.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
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
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '70%' }}
          icon={false}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginPage;