import styled from "styled-components";
import AppLayout from "./shared/ui/AppLayout";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useGetDarkmode } from "./shared/hooks/useGetDarkmode";
import { useEffect, useMemo } from "react";
import MangerMap from "./components/MainMap/MangerMap";
import getToken from "./shared/helpers/GetToken";
const AppContainer = styled.div`
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
`;
const routs = createBrowserRouter([
    {
        path: "/",
        element: (
            <AppContainer>
                <AppLayout />
            </AppContainer>
        ),
        children: [{ path: "/dashboard", element: <Dashboard /> }],
    },
    {
        index: true,
        element: <Navigate to="/MainMap" replace />,
    },
    { path: "/MainMap", element: <MangerMap /> },
]);

function App() {
    useEffect(() => {
        getToken();
    }, []);
    const { mode } = useGetDarkmode();
    let currentMode = "dark";
    mode === "dark" ? (currentMode = "dark") : (currentMode = "light");
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: currentMode,
                },
            }),
        [currentMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routs}></RouterProvider>
        </ThemeProvider>
    );
}

export default App;
