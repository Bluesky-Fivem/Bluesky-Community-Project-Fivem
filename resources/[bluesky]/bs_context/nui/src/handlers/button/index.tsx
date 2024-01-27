import {Button as MUIButton} from '@mui/material'
export const Button = (ButtonAttributes) => {
    return (
        <MUIButton
            {...ButtonAttributes}
            style={{
                color: '#FFFFFF',
                backgroundColor: '#FF0039'
            }}
        />
    )
}