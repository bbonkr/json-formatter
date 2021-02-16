import React from 'react';
import { TextField, Button, ButtonGroup } from '@material-ui/core';
import { FormState, FormValueKeys } from '../../models/FormState';
import './MainForm.css';

interface MainFormProps {
    formState: FormState;
    onChange?: (name: FormValueKeys, value: string) => void;
    onFormat?: () => void;
    onReset?: () => void;
}

export const MainForm = ({
    formState,
    onChange,
    onFormat,
    onReset,
}: MainFormProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.info('formState.isVaild', formState.isVaild);
        if (formState.isVaild) {
            if (onFormat) {
                console.info('submit');
                onFormat();
            }
        }
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as FormValueKeys;
        const value = event.target.value;

        if (onChange) {
            onChange(name, value);
        }
    };

    const hasError = (name: FormValueKeys): boolean => {
        if (
            formState.touches &&
            name in formState.touches &&
            formState.touches[name] &&
            formState.errors &&
            name in formState.errors
        ) {
            const errors = formState.errors[name];
            if (errors && errors.length > 0) {
                return true;
            }
        }
        return false;
    };

    const getErrorMessage = (name: FormValueKeys): string => {
        if (
            formState.touches &&
            name in formState.touches &&
            formState.touches[name] &&
            formState.errors &&
            name in formState.errors
        ) {
            const errors = formState.errors[name];
            if (errors && errors.length > 0) {
                return errors[0];
            }
        }
        return '';
    };

    const handleReset = () => {
        if (onReset) {
            onReset();
        }
    };

    return (
        <section>
            <form
                className="main-form"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <TextField
                    label="Raw json"
                    multiline
                    rows={6}
                    name="json"
                    value={formState.values.json}
                    onChange={handleChangeInput}
                    placeholder="Raw json HERE"
                    error={hasError('json')}
                    helperText={getErrorMessage('json')}
                />
                <ol>
                    <li>Pastes your source text on source textarea.</li>
                    <li>Click a Format button.</li>
                </ol>

                <ButtonGroup className="button-group">
                    <Button type="reset" color="secondary" variant="contained">
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={!formState.isVaild}
                    >
                        Fotmat
                    </Button>
                </ButtonGroup>
            </form>
        </section>
    );
};
