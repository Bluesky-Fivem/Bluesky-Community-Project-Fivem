import { makeStyles } from '@mui/styles';

export default makeStyles({
    erpingerOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      erpingerInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      erpingerHeader: {
        position: 'absolute',
        top: '5%',
        width: '100%',
        background: 'linear-gradient(114deg, rgba(255,175,156,1) 0%, rgba(153,48,91,1) 100%)',
        height: '4.4vmin',
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        textAlign: 'center',
        fontSize: '1.6vmin',
        textShadow: '1px 0px 0px rgba(0, 0, 0, 1)'
      }
});