import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import Button from '@mui/material/Button';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./paynless.styles";
import AppContainer from '../../../components/app-container';
import moment from 'moment';
import { Tab, Tabs } from '@mui/material';

const PaynlessApp: React.FC = () => {
    const classes = useStyles();

    const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
    const [unitsData, setUnitsData] = useState([]);
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [isEmployed, setIsEmployed] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const [checkmark, setCheckmark] = useState(false)
    const [preparing, setPreparing] = useState(false)

    useEffect(() => {
        fetchNui('getUnitData', {}).then(resData => {
            //Always set owned data here, since we will overwrite it when they go to manage tab.
            setUnitsData(resData.data)
            setFilteredUnits(resData.data)
            setIsEmployed(resData.employed)
        })
    }, []);

    const handleHoverActive = (e: any) => {
        setHoverId(e.currentTarget.id)
    }

    const handleHoverNotActive = () => {
        setHoverId("")
    }

    useNuiEvent<boolean>('closeApps', () => {
        setLoading(false)
        setCheckmark(false)
        setPreparing(false)
    })

    const [tab, setTab] = React.useState(0);

    const handleTab = (event, newValue) => {
        //Here fetch data based on tab (if tab 0 fetch owned data, if tab 1 fetch manage data)
        if (newValue === 0) {
            console.log("tab is 0, fetch owned data")
            fetchNui('getUnitData', {}).then(resData => {
                //Always set owned data here, since we will overwrite it when they go to manage tab.
                setUnitsData(resData.data)
                setFilteredUnits(resData.data)
                setTab(newValue);
            })
        } else if (newValue === 1) {
            console.log("tab is 1, fetch manage data")
            fetchNui('getManageData', {}).then(resData => {
                setUnitsData(resData.data)
                setFilteredUnits(resData.data)
                setTab(newValue);
            })
        }
    };

    return (
        <>
            <AppContainer
                emptyMessage={filteredUnits.length === 0}
                primaryActions={[]}
                search={{
                    filter: ['storage_id', 'storage_business', 'storage_size'],
                    list: unitsData,
                    onChange: setFilteredUnits,
                }}
            >
                <Tabs centered variant="fullWidth" value={tab} onChange={handleTab} aria-label="icon tabs example" sx={{ display: isEmployed ? '' : 'none' }}>
                    <Tab label="Owned" />
                    <Tab label="Manage" />
                </Tabs>
                <div style={{ display: tab === 0 ? '' : 'none', marginTop: isEmployed ? '10%' : 'unset' }}>
                    {filteredUnits && filteredUnits.length > 0 ? (
                        filteredUnits.map((unit) => (
                            <div key={unit.id} id={unit.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                                <div className="main-container">
                                    <div className="image">
                                        <i className="fas fa-archive fa-w-16 fa-fw fa-3x"></i>
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{unit.storage_id} {`(${unit.storage_size})`} </Typography>
                                        </div>
                                        <div className="description">
                                            <div className="flex-row">
                                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Business: {unit.storage_business}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={hoverId.toString() === unit.id.toString() ? "actions actions-show" : "actions"}>
                                        <Tooltip title="Manage Unit" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-cog fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Pay Unit" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-dollar-sign fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-map-marker-alt fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                        </>
                    )}
                </div>
                <div style={{ display: tab === 1 && isEmployed ? '' : 'none', marginTop: '10%' }}>
                    {filteredUnits && filteredUnits.length > 0 ? (
                        filteredUnits.map((unit) => (
                            <div key={unit.id} id={unit.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                                <div className="main-container">
                                    <div className="image">
                                        <i className="fas fa-archive fa-w-16 fa-fw fa-3x"></i>
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{unit.storage_id} {`(${unit.storage_size})`} </Typography>
                                        </div>
                                        <div className="description">
                                            <div className="flex-row">
                                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Business: {unit.storage_business}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={hoverId.toString() === unit.id.toString() ? "actions actions-show" : "actions"}>
                                        <Tooltip title="Manage Tenant" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-user-edit fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Remove Tenant" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-user-times fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Manage Unit" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-cog fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i id={unit.id} className="fas fa-map-marker-alt fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </AppContainer>
        </>
    );
}

export default PaynlessApp;