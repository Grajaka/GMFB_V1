import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';


let theme = createTheme({
    // Theme customization goes here as usual, including tonalOffset and/or
    // contrastThreshold as the augmentColor() function relies on these
});
theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
        grayIcon: theme.palette.augmentColor({
            color: {
                main: '#4d4d4d',
            },
            name: 'grayIcon',
        }),
    },
});

export default function Search() {
    return (
        <ThemeProvider theme={theme}>
            <div className="flex-row inline-flex items-center ml-0 m-5">
                <MenuIcon fontSize="large" color="grayIcon"/>
                <input inputMode="text" placeholder="Buscar"/>
                <button className="bg-white rounded-r-sm h-9.5 border-l-gray-500"><SearchIcon/></button>
            </div>
        </ThemeProvider>

    );
}
