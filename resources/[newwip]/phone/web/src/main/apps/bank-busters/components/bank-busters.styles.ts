import { makeStyles } from '@mui/styles';

export default makeStyles({
  heistMembers: {
    width: '100%',
    height: 'calc(100% - 72px)',
    maxHeight: 'calc(100% - 72px)',
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
  bankBustersInvitePlayerModalContainer: {
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
  bankBustersInvitePlayerModalInnerContainer: {
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
  bankBustersConfirmModalContainer: {
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
  bankBustersConfirmModalInnerContainer: {
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
  }
});