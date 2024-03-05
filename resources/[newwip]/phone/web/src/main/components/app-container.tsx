import React from 'react';
import '../index.css';
import useStyles from './app-container.styles';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Tooltip } from '@mui/material';

interface appContainerProps {
    emptyMessage: boolean;
    primaryActions: any;
    search?: any;
}

const AppContainer: React.FC<appContainerProps> = (props) => {
    const classes = useStyles();

    const handleSearch = (searchValue) => {
        if (searchValue !== '') {
            const allowed = props.search.filter;
            const list = props.search.list;
            const _searchValue = searchValue.toString().toLowerCase()

            const filtered = list
                .filter(obj =>
                    Object.keys(obj).some(k => allowed.includes(k))
                )
                .filter(obj =>
                    Object.values(obj)
                        .map(v => v?.toString().toLocaleLowerCase())
                        .some(v => v?.startsWith(_searchValue))
                )

            props.search.onChange(filtered)
        } else {
            props.search.onChange(props.search.list)
        }
    }

    return (
        <>
            <div className={classes.appOuterContainer} style={{ zIndex: 500 }}>
                <div className={classes.appInnerContainer}>
                    <div className="app-container">
                        <div className={classes.appSearch} style={{display: props.search.length == 0 ? 'none' : ''}}>
                            {props.primaryActions && props.primaryActions.length > 0 ? (
                                props.primaryActions.map((action) => (
                                    <>
                                        {action.type && action.type === "goback" ? (
                                            <Tooltip title={action.title} placement={action.placement} sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                                <div style={{ color: '#fff', width: '40px', display: 'flex', alignItems: 'center' }}>
                                                    <i onClick={action.action} className={`fas ${action.icon} fa-fw fa-lg`}></i>
                                                </div>
                                            </Tooltip>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </>

                                ))
                            ) : (
                                <>
                                </>
                            )}
                            <div className={classes.appSearchWrapper}>
                                <div className="input-wrapper">
                                    <FormControl fullWidth sx={{ width: '100%' }}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Search"
                                            onChange={(e) => handleSearch(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        {props.primaryActions && props.primaryActions.length > 0 ? (
                            props.primaryActions.map((action) => (
                                <>
                                    {action.type && action.type === "icon" ? (
                                        <div className={classes.appIcon}>
                                            <div className={classes.appIconWrapper}>
                                                <Tooltip title={action.title} placement={action.placement} sx={{ display: action.show ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                                    <i onClick={action.action} style={{ display: action.show ? '' : 'none', fontSize: '1.2em' }} className={`${action.icon} fa-fw fa-lg`}></i>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </>

                            ))
                        ) : (
                            <>
                            </>
                        )}
                        <div className={classes.appList}>
                            {props.children}
                            <div className="flex-centered" style={{ display: props.emptyMessage ? 'flex' : 'none', padding: '32px', flexDirection: 'column', textAlign: 'center' }}>
                                <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Nothing Here!</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppContainer