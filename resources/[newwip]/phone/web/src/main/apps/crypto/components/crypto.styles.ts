import { makeStyles } from '@mui/styles';

export default makeStyles({
    root: {
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        maxWidth: "100vw",
        minWidth: "100vw",
        maxHeight: "100vh",
        minHeight: "100vh",
        pointerEvents: "none",
        border: "0px",
        margin: "0px",
        outline: "0px",
        padding: "0px",
        overflow: "hidden",
        "& .MuiInput-root": {
          color: "white",
          fontSize: '1.3vmin'
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderColor: "darkgray"
      },
      "& .MuiInput-underline:before": {
          borderColor: "darkgray",
          color: "darkgray"
      },
      "& .MuiInput-underline:after": {
          borderColor: "white",
          color: "darkgray"
      },
      "& .MuiInputLabel-animated": {
          color: "darkgray",
          fontSize: '1.5vmin'
      },
      "& .MuiInputAdornment-root": {
          color: "darkgray",
      },
      "& label.Mui-focused": {
        color: "darkgray"
      },
      },
      input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
    },
    cryptoPurchaseModalContainer: {
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      display: 'flex',
      zIndex: '1000',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    cryptoPurchaseModalInnerContainer: {
      width: 'calc(100% - 64px)',
      height: 'auto',
      display: 'flex',
      padding: '16px',
      overflow: 'hidden scroll',
      position: 'relative',
      maxHeight: '80%',
      minHeight: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(48, 71, 94)'
    },
    cryptoExchangeModalContainer: {
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      display: 'flex',
      zIndex: '1000',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    cryptoExchangeModalInnerContainer: {
      width: 'calc(100% - 64px)',
      height: 'auto',
      display: 'flex',
      padding: '16px',
      overflow: 'hidden scroll',
      position: 'relative',
      maxHeight: '80%',
      minHeight: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(48, 71, 94)'
    },
});