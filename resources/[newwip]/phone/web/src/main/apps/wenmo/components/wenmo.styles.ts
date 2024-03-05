import { makeStyles } from '@mui/styles';

export default makeStyles({
    wenmoOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      wenmoInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      wenmoSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      wenmoSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      wenmoIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      wenmoIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      wenmoLogs: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
        minHeight: 'calc(100% - 72px)',
      },
});