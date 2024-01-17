import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { publishRoute, privateRoute } from './routes';
import { DefaultLayout } from './layouts';
import ScrollAutoTop from './components/ScrollAutoTop/index.ts';
import { ToastContainer } from 'react-toastify';

import { createTheme } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsTheme } from './components/SpeedDial/themeSlice.ts';
import { selectIsLogin } from './pages/LogIn/loginSlice.ts';

function App() {
    const isLogin = useSelector(selectIsLogin);
    const storedTheme = useSelector(selectIsTheme);
    const [theme, setTheme] = useState(
        createTheme({
            palette: {
                mode: storedTheme === 'light' ? 'light' : 'dark',
            },
        }),
    );

    useEffect(() => {
        setTheme(
            createTheme({
                palette: {
                    mode: storedTheme === 'light' ? 'light' : 'dark',
                },
            }),
        );
    }, [storedTheme]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {!isLogin ? (
                <Router>
                    <ScrollAutoTop />
                    <div className="App">
                        <Routes>
                            {publishRoute.map((item, index) => {
                                const Layout = item.layout === null ? Fragment : item.layout || DefaultLayout;

                                const Element = item.component;
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={
                                            <Layout>
                                                <Element />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            ) : (
                <Router>
                    <ScrollAutoTop />
                    <div className="App">
                        <Routes>
                            {privateRoute.map((item, index) => {
                                const Layout = item.layout === null ? Fragment : item.layout || DefaultLayout;

                                const Element = item.component;
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={
                                            <Layout>
                                                <Element />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            )}
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </ThemeProvider>
    );
}

export default App;
