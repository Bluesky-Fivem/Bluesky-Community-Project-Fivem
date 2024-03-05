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
      phoneContainer: {
        top: 'unset',
        left: 'unset',
        right: '20px', //When landscape change to: 0px
        width: '280px', //When landscape change to: 978px
        bottom: '0px', //When landscape change to: 0px
        height: '652px', //When landscape change to: 420px
        zIndex: '20',
        position: 'absolute',
        minWidth: '280px', //When landscape change to: 978px
        minHeight: '652px', //When landscape change to: 420px
        pointerEvents: 'all',
        margin: 'unset', //When landscape change to: auto
        overflow: 'hidden', //Animation normal: 500ms ease 0s 1 normal none running rotateportrait. LANDSCAPE: 500ms ease 0s 1 normal none running rotatelandscape;
        background: 'url(https://cdn.discordapp.com/attachments/941695751480807494/951465469204922408/download.jpg) 0% 0% / cover no-repeat',
        transition: 'bottom 800ms ease 0s',
        borderRadius: '6px',
        backgroundRepeat: 'no-repeat'
      },
      phoneTopContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '24px',
        display: 'flex',
        zIndex: '100',
        position: 'absolute',
        minHeight: '24px',
        userSelect: 'none',
        justifyContent: 'center'
      },
      phoneTopLeftContainer: {
        color: '#fff',
        height: '24px',
        display: 'flex',
        padding: '0px 12px',
        minWidth: '74px',
        minHeight: '24px',
        alignItems: 'center',
        paddingRight: '4px !important'
      },
      phoneTopRightContainer: {
        color: '#fff',
        height: '24px',
        display: 'flex',
        padding: '0px 12px',
        minWidth: '74px',
        minHeight: '24px',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      phoneTopLeftDivider: {
        flex: '1 1 0%',
        marginLeft: '8px'
      },
      phoneTopMiddleContainer: {
        flex: '1 1 0%'
      },
      phoneAppInnerContainer: {
        width: '100%',
        height: '100%',
        padding: '0px',
        overflow: 'hidden scroll',
        maxHeight: '100%',
        minHeight: '100%'
      },
      phoneAppApps: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
      },
      phoneApp: {
        width: '54px',
        height: '54px',
        margin: '8px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        borderRadius: '14px',
        justifyContent: 'center'
      },
      wifiConnectModalContainer: {
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
      wifiConnectModalInnerContainer: {
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