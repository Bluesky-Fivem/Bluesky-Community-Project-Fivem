import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface SelectProps {
    label: string;
    value: string;
    onChange: any;
    items: any;
}

const Select: React.FC<SelectProps> = (props) => {
    return (
        <>
            <FormControl fullWidth sx={{ width: '100%' }}>
                <TextField id="outlined-select-currency" variant='standard' select label={props.label} value={props.value} onChange={(e) => props.onChange(e.target.value)} sx={{
                    "& .MuiInput-root": {
                        color: "white !important",
                    },
                    "& label.Mui-focused": {
                        color: "darkgray !important"
                    },
                    "& Mui-focused": {
                        color: "darkgray !important"
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderColor: "darkgray !important"
                    },
                    "& .MuiInput-underline:before": {
                        borderColor: "darkgray !important",
                        color: "darkgray !important"
                    },
                    "& .MuiInput-underline:after": {
                        borderColor: "white !important",
                        color: "darkgray !important"
                    },
                    "& .Mui-focused:after": {
                        color: "darkgray !important",
                    },
                    "& .MuiInputAdornment-root": {
                        color: "darkgray !important",
                    }
                }}>
                    {props.items && props.items.length > 0 ? (
                        props.items.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))
                    ) : (
                        <>
                        </>
                    )}
                </TextField>
            </FormControl>
        </>
    );
}

export default { Select };