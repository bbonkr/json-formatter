interface FormValue {
    json: string;
}

export type FormValueKeys = keyof FormValue;

type FormTouch = {
    [key in FormValueKeys]?: boolean;
};

type FormError = {
    [key in FormValueKeys]?: string[];
};

export interface FormState {
    isVaild: boolean;
    values: FormValue;
    touches: FormTouch;
    errors: FormError;
}
