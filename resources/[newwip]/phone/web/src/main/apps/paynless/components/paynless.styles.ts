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
      paynlessOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      paynlessInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      paynlessSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      paynlessSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      paynlessIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      paynlessIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      paynlesspaynless: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
        minHeight: 'calc(100% - 72px)',
      },
});