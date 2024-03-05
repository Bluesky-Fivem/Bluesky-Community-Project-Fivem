import { makeStyles } from '@mui/styles';

export default makeStyles({
      twitterComponentContainer: {
        display: 'inline-block',
        position: 'relative',
        backgroundColor: '#0c63c5',
        height: 'fit-content',
        padding: '2px 10px',
        width: '100%',
        borderRadius: '5px',
        color: '#fff',
        marginBottom: '6%'
      },
      twitterTwatModalContainer: {
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
      twitterTwatModalInnerContainer: {
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