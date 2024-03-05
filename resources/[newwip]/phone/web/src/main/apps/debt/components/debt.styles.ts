import { makeStyles } from '@mui/styles';

export default makeStyles({
    debtOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      debtInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      debtSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      debtSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      debtIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      debtIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      debtWrapper: {
        maxHeight: '41vh',
        width: '100%',
        overflowY: 'auto',
        position: 'absolute',
        top: '10vh'
      },
      debtFees: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      debtLoans: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
});