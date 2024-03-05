import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Checkmark } from 'react-checkmark';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./sports-book.styles";
import AppContainer from '../../../components/app-container';
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import SportsbookDropdown from './sports-book-dropdown';

const SportsbookApp: React.FC = () => {
    const classes = useStyles();

    const [eventData, setEventData] = useState([
        { id: "1", event: 'VLC 3 Main Event', fighters: 'Kael Soze VS Bovice' }
    ])
    const [isLoading, setLoading] = useState(false)
    const [checkmark, setCheckmark] = useState(false)
    const [preparing, setPreparing] = useState(false)

    useEffect(() => {
        // fetchNui('getSportsBookData', {}).then(resData => {
        //   setEventData(resData.events)
        // })
    }, []);

    useNuiEvent<boolean>('closeApps', () => {
        setLoading(false)
        setPreparing(false)
        setCheckmark(false)
    })

    const primaryActions: any = [];

    //people with certain permission in diamond business can create events in app

    return (
        <>
            <AppContainer
                emptyMessage={eventData.length === 0}
                primaryActions={primaryActions}
                search={[]}
            >
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '15%'}}>
                    <i className="fas fa-gem fa-3x" style={{color: 'white'}}></i>
                </div>
                {eventData && eventData.length > 0 ? (
                    eventData.map((event) => (
                        <SportsbookDropdown id={event.id} icon="fas fa-dollar-sign" name={event.event} description={event.fighters} fighters={[]} />
                    ))
                ) : (
                    <>
                    </>
                )}
            </AppContainer>
        </>
    );
}

export default SportsbookApp;