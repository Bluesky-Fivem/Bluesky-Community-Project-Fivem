import { makeStyles } from '@mui/styles';

export default makeStyles({
    racingOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      racingInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      racingSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      racingSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      racingIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      racingIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      racingWrapper: {
        maxHeight: '41vh',
        width: '100%',
        overflowY: 'auto',
        position: 'absolute',
        top: '10vh'
      },
      racingPending: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      racingActive: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      racingCompleted: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      racingTracks: {
        width: '100%',
        padding: '0px 16px',
        overflow: 'hidden scroll'
      },
      racingCreateRaceModalContainer: {
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
      racingCreateRaceModalInnerContainer: {
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