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
      employeesOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      employeesInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      employeesSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      employeesSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      employeesIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      employeesIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      employeesEmployees: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
        minHeight: 'calc(100% - 72px)',
      },
      employeeEditEmployeeModalContainer: {
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
      employeeEditEmployeeModalInnerContainer: {
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
      employeeHireEmployeeModalContainer: {
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
      employeeHireEmployeeModalInnerContainer: {
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
      employeeChargeCustomerModalContainer: {
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
      employeeChargeCustomerModalInnerContainer: {
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
      employeeDeleteRoleModalContainer: {
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
      employeeDeleteRoleModalInnerContainer: {
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
      employeeCreateRoleModalContainer: {
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
      employeeCreateRoleModalInnerContainer: {
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
      employeeEditRoleModalContainer: {
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
      employeeEditRoleModalInnerContainer: {
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