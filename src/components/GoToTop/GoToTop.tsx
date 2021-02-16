import React from 'react';
import { IconButton } from '@material-ui/core';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
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
                <VerticalAlignTopIcon />
            </IconButton>
        </div>
    );
};
