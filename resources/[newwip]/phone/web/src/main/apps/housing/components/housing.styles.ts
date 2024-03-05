import { makeStyles } from '@mui/styles';

export default makeStyles({
    housingOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      housingInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      housingSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      housingSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      housingIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      housingIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      housingHouses: {
        width: '20%',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
        minHeight: 'calc(100% - 72px)',
      },
      housingUpgrades: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
      },
      housingButtons: {
        width: '100%',
        height: '45px',
        display: 'flex',
        paddingTop: '0px',
        paddingBottom: '15px',
        justifyContent: 'center',
        //paddingRight: '42px',
        //paddingLeft: '42px',
        //position: 'relative'
      },
      housingNothingFoundModalContainer: {
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
      housingNothingFoundModalInnerContainer: {
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
      housingFoundModalContainer: {
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
      housingFoundModalInnerContainer: {
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
      housingKeysModalContainer: {
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
      housingKeysModalInnerContainer: {
        width: 'calc(100% - 64px)',
        height: 'auto',
        display: 'flex',
        padding: '16px',
        overflow: 'hidden scroll',
        position: 'relative',
        maxHeight: '80%',
        minHeight: '30%',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgb(48, 71, 94)'
      },
});