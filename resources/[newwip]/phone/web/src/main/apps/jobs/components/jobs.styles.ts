import { makeStyles } from '@mui/styles';

export default makeStyles({
    jobsOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      jobsInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      jobsSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        marginBottom: '8px'
      },
      jobsSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      jobsIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      jobsIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      jobsJobs: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
      },
      jobsGroups: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: 'calc(100% - 72px)',
      },
      jobsGroupsIdle: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      jobsGroupsBusy: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      jobsInGroupLeader: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      jobsInGroupMembers: {
        width: '100%',
        height: 'calc(100% - 72px)',
        padding: '0px 16px',
        maxHeight: 'calc(100% - 72px)',
      },
      jobsGroupsWrapper: {
        maxHeight: '41vh',
        width: '100%',
        overflowY: 'auto',
        position: 'absolute',
        top: '15vh'
      },
      jobsInGroupWrapper: {
        maxHeight: '41vh',
        width: '100%',
        overflowY: 'auto',
        position: 'absolute',
      },
      waitingForActivity: {
        width: '88.6%',
        marginLeft: '5.6%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '8px',
        marginBottom: '8px',
        borderBottom: '1px solid #fff'
      },
      jobsInGroupButtons: {
        width: 'auto',
        position: 'absolute',
        top: '81%',
        left: '50%',
        transform: 'translate(-50%)'
      },
});