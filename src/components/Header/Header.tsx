import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

import './Header.css';

export const Header = () => {
    const handleClickGitHub = () => {
        window.open('https://github.com/bbonkr/json-formatter');
    };
    return (
        <AppBar position="fixed" className="header">
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6">JSON Formatter</Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="github"
                    onClick={handleClickGitHub}
                >
                    <GitHub />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
