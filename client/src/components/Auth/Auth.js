import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputFile from './input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
const initialState = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
       setFormData({
           ...formData,
           [e.target.name] : e.target.value
       })
    }
    const switchMode= () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }
    const googleSucess = async (res) => {
        const result = res?.profileObj;
        const token  = res?.tokenId
        try {
            dispatch({ type: 'AUTH', data:{ result, token}})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        console.log(res)
    }
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'LogIn'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <InputFile
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <InputFile
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                    />

                                </>
                            )
                        }
                        <InputFile
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <InputFile
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <InputFile
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    
                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? 'Sign Up' : 'LogIn'}
                    </Button>
                    <GoogleLogin
                        clientId='682337578993-bfiistibl7smlv1okml6v6jsq3umkrv8.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant="contained"
                            >
                                Google SignIn
                            </Button>
                        )}
                        onSuccess={googleSucess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid
                        container justify="flex-end"
                    >
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? LogIn' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
