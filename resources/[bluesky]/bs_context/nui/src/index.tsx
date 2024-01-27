import { ThemeProvider, createTheme } from "@mui/material";
import { App } from "App";
import React from "react";
import { createRoot } from 'react-dom/client';

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
});

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider
            theme={theme}
        >
            <App />
        </ThemeProvider>
    </React.StrictMode>
)