import { makeStyles } from '@mui/styles';

export default makeStyles({
      outerContainer: {
        width: '100%',
        height: '100%',
        padding: '0px 16px',
        overflow: 'hidden scroll',
        maxHeight: '100%',
        minHeight: '100%'
      },
      container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      moneys: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 0 16px',
        '& .cash': {
          color: 'rgb(174, 213, 129)'
        },
        '& .bank': {
          color: 'rgb(77, 208, 225)'
        },
        '& .casino': {
          color: 'rgb(255, 64, 129)'
        },
        '& div': {
          flex: '1',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          '& span': {
            marginLeft: '16px',
            fontSize: '1.75rem'
          },
          '& h6': {
            marginLeft: '16px'
          }
        }
      },
      licenses: {
        flex: '1',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'flex-start',
        justifyContent: 'flex-start'
      },
      license: {
        marginTop: '16px',
        width: '100%',
        display: 'flex',
        textTransform: 'capitalize',
        '& div': {
          flex: '1',
          display: 'flex',
          alignItems: 'center'
        },
        '& .icon': {
          display: 'flex',
          justifyContent: 'flex-end',
        },
        '& .icon-green': {
          color: '#AED581'
        },
        '& .icon-red': {
          color: '#FF4081'
        },
      },
      jobs: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        textTransform: 'capitalize',
        '& div': {
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          marginTop: '16px',
          '& p': {
            marginLeft: '16px'
          }
        }
      }
});