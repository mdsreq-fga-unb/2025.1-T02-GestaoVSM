import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AgendaPage from './pages/AgendaPage.jsx';
import CloseTillPage from './pages/CloseTillPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PanelPage from './pages/PanelPage.jsx';
//import AgendaMock from './pages/AgendaMock.jsx';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.js'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/fechar-caixa" element={<CloseTillPage />} />
          <Route path="/painel" element={<PanelPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;