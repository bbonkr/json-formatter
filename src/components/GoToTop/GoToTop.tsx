import React from 'react';
import { IconButton } from '@mui/material';
import { VerticalAlignTop } from '@mui/icons-material';
import './GoToTop.css';

interface GoToTopProps {
    show?: boolean;
}

export const GoToTop = ({ show }: GoToTopProps) => {
    const handleClickGoToTop = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    };
    if (!show) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <div className="go-to-top">
            <IconButton color="default" onClick={handleClickGoToTop}>
                <VerticalAlignTop />
            </IconButton>
        </div>
    );
};
