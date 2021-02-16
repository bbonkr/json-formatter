import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Prism from 'prismjs';
import './PrintJson.css';
import 'prismjs/themes/prism-tomorrow.css';

interface PrintJsonProps {
    json?: string;
}

export const PrintJson = ({ json }: PrintJsonProps) => {
    useEffect(() => {
        if (json) {
            Prism.highlightAll(true);
        }
    }, [json]);

    return (
        <section className="print-json">
            <Paper elevation={3}>
                <pre className="language-json">{json}</pre>
            </Paper>
        </section>
    );
};
