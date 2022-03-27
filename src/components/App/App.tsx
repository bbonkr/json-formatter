import React, { useEffect, useRef, useState } from 'react';
import { FormState, FormValueKeys } from '../../models/FormState';
import { Header } from '../Header';
import { MainForm } from '../MainForm';
import { PrintJson } from '../PrintJson';
import validate from 'validate.js';
import { GoToTop } from '../GoToTop';
import { useSnackbar } from 'notistack';

import './App.css';

const constraints = {
    json: {
        presence: {
            allowEmpty: false,
            message: '^Raw json is required.',
        },
    },
};

export const App = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [formState, setFormState] = useState<FormState>({
        isVaild: false,
        values: { json: '' },
        touches: {},
        errors: {},
    });
    const [showGoToTop, setShowGoToTop] = useState(false);

    const [formattedValue, setFormattedValue] = useState('');

    const containerDivRef = useRef<HTMLDivElement>(null);

    const handleMainFormChange = (name: FormValueKeys, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            values: {
                ...prevState.values,
                [name]: value,
            },
            touches: {
                ...prevState.touches,
                [name]: true,
            },
        }));
    };

    const handleClickFormat = () => {
        try {
            const formattedJson = JSON.stringify(
                JSON.parse(formState.values.json),
                null,
                4,
            );
            setFormattedValue((_) => formattedJson);

            window.setTimeout(() => {
                setShowGoToTop(
                    (_) =>
                        document.body.clientHeight <
                        (containerDivRef.current?.scrollHeight ?? 0),
                );
            }, 300);
        } catch (err) {
            enqueueSnackbar('Could not format.', { variant: 'error' });
        }
    };

    const handleReset = () => {
        setFormState((prevState) => ({
            ...prevState,
            values: {
                json: '',
            },
            touches: {},
            errors: {},
        }));
        setFormattedValue((_) => '');
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then((registration) => {
                        // tslint:disable:no-console
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log(
                            'SW registration failed: ',
                            registrationError,
                        );
                    });
            });
        }
    }, []);

    useEffect(() => {
        const errors = validate(formState.values, constraints);
        console.info('error', errors);
        setFormState((prevState) => ({
            ...prevState,
            isVaild: !errors,
            errors: errors,
        }));
    }, [formState.values]);

    return (
        <React.Fragment>
            <div className="container" ref={containerDivRef}>
                <Header />
                <MainForm
                    formState={formState}
                    onChange={handleMainFormChange}
                    onFormat={handleClickFormat}
                    onReset={handleReset}
                />
                {formattedValue && <PrintJson json={formattedValue} />}
            </div>
            <GoToTop show={showGoToTop} />
        </React.Fragment>
    );
};
