import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AgendaPage from './pages/AgendaPage.jsx';
import AgendaMock from './pages/AgendaMock.jsx';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.js'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          {/*<Route path="/" element={<AgendaPage />} />  trocar path depois */}
          <Route path="/" element={<AgendaMock />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;