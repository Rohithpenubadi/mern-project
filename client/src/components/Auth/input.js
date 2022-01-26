import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputFile = ({ name,handleChange, half, autoFocus, type, handleShowPassword, label }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                autoFocus={autoFocus}
                type={type}
                label={label}
                InputProps={name === 'password' ? {
                    endAdorment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                { type === "password" ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    );
};

export default InputFile;
