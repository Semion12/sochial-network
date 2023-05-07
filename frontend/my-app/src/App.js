import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import { themeSettings } from './theme';
import HomePage from "./pages/homePage";
import LoginPage from './pages/loginPage';

import ProfilePage from './pages/profilePage';
import { createTheme } from '@mui/material/styles';

import { useSelector } from 'react-redux';



function App() {
  const mode = useSelector((state) => state.auth.mode)
  const theme = createTheme(themeSettings(mode))
  const isAuth = useSelector((state) => state.auth.token)
  return (
    <div>

      <BrowserRouter>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to={'/'} />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
