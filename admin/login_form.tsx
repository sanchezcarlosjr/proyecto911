import * as React from 'react';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import {Button, CardContent, CircularProgress, InputAdornment} from '@mui/material';
import {
    Form,
    required,
    useTranslate,
    useLogin,
    useNotify,
    useSafeSetState,
} from 'ra-core';
import {TextInput} from "ra-ui-materialui";

export const LoginForm = (props: LoginFormProps) => {
    const {redirectTo, className} = props;
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate();
    const notify = useNotify();

    const submit = (values: FormData) => {
        setLoading(true);
        login(values, redirectTo)
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                            ? 'ra.auth.sign_in_error'
                            : error.message,
                    {
                        type: 'warning',
                        messageArgs: {
                            _:
                                typeof error === 'string'
                                    ? error
                                    : error && error.message
                                        ? error.message
                                        : undefined,
                        },
                    }
                );
            });
    };

    return (
        <StyledForm
            // @ts-ignore
            onSubmit={submit}
            mode="onChange"
            noValidate
            className={className}
        >
            <CardContent className={LoginFormClasses.content}>
                <TextInput
                    autoFocus
                    variant="outlined"
                    size={"medium"}
                    source="username"
                    label={translate('ra.auth.username')}
                    validate={required()}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                @uabc.edu.mx
                            </InputAdornment>
                        ),
                    }}
                />
                <TextInput
                    variant="outlined"
                    source="password"
                    size={"medium"}
                    label={translate('ra.auth.password')}
                    type="password"
                    autoComplete="current-password"
                    validate={required()}
                    helperText={"Contraseña institucional. Este sistema no guarda ninguna contraseña."}
                    fullWidth
                />

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    className={LoginFormClasses.button}
                >
                    {loading ? (
                        <CircularProgress
                            className={LoginFormClasses.icon}
                            size={19}
                            thickness={3}
                        />
                    ) : (
                        translate('ra.auth.sign_in')
                    )}
                </Button>
            </CardContent>
        </StyledForm>
    );
};

const PREFIX = 'RaLoginForm';

export const LoginFormClasses = {
    content: `${PREFIX}-content`,
    button: `${PREFIX}-button`,
    icon: `${PREFIX}-icon`,
};

const StyledForm = styled(Form, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({theme}) => ({
    [`& .${LoginFormClasses.content}`]: {
        width: 400,
    },
    [`& .${LoginFormClasses.button}`]: {
        marginTop: theme.spacing(2),
    },
    [`& .${LoginFormClasses.icon}`]: {
        margin: theme.spacing(0.3),
    },
}));

export interface LoginFormProps {
    redirectTo?: string;
    className?: string;
}

interface FormData {
    username: string;
    password: string;
}

LoginForm.propTypes = {
    redirectTo: PropTypes.string,
};
