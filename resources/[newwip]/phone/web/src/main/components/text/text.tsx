import React from 'react';
import Typography from '@mui/material/Typography';

interface TextProps {
    variant: any;
    style?: any;
    sx?: any;
    gutterBottom: boolean;
}

const Text: React.FC<TextProps> = (props) => {
    return (
        <>
        <Typography variant={props.variant} style={props.style} sx={props.sx} gutterBottom={props.gutterBottom}>
            {props.children}
        </Typography>
        </>
    );
}

export default Text;