import React, { useState, useEffect } from 'react';
import '../../../index.css';
import { fetchNui } from '../../../../utils/fetchNui';
import { Tooltip } from '@mui/material';
import AppContainer from '../../../components/app-container';
import Input from '../../../components/input/input';
import Text from '../../../components/text/text';
import Icon from '../../../components/icon/icon';
import useStyles from './doj.styles';

const DOJApp: React.FC = () => {
    const [list, changeList] = useState([]);
    const [listCached, changeListCached] = useState([]);
    const [status, changeStatus] = useState("");
    const [isGranted, setIsGranted] = useState(false);

    useEffect(() => {
        fetchNui('pnp-ui:getDOJData', {}).then(resData => {
            changeList(resData.data.list === undefined ? [] : resData.data.list);
            changeListCached(resData.data.list === undefined ? [] : resData.data.list);
            changeStatus(resData.data.status);
            setIsGranted(resData.data.granted === undefined ? false : resData.data.granted)
        })
    }, []);

    const classes = useStyles();

    const primaryActions: any = [];

    const setStatus = (status: string) => {
        fetchNui('pnp-ui:setDOJStatus', { status: status }).then(resData => {
            changeList(resData.data.list === undefined ? [] : resData.data.list);
            changeListCached(resData.data.list === undefined ? [] : resData.data.list);
            setIsGranted(resData.data.granted === undefined ? false : resData.data.granted)
            changeStatus(resData.data.status);
        });
        changeStatus(status)
    }

    const handleCallNumber = (number: number) => {
        fetchNui('pnp-ui:callStart', {
            number: number
        })
    }

    const listThings = {
        Lawyer: listCached.filter(i => i.job === 'lawyer'),
        Judge: listCached.filter(i => i.job === 'judge'),
    };

    return (
        <AppContainer
            emptyMessage={listCached.length === 0}
            primaryActions={primaryActions}
            search={{
                filter: ['name'],
                list: list,
                onChange: changeListCached,
            }}
        >
            {isGranted && (<div>
                <div style={{ textAlign: 'left', marginTop: 8, marginBottom: 8 }}>
                    <Input.Select
                        label="Status"
                        value={status}
                        onChange={v => setStatus(v)}
                        items={[
                            { id: 'Available', name: 'Available' },
                            { id: 'In Trial', name: 'In Trial' },
                            { id: 'Busy', name: 'Busy' },
                        ]}
                    />
                </div>
            </div>)}
            {Object.keys(listThings).filter(key => !!listThings[key].length).map((key) => (
                <div key={key} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid white' }}>
                    <Text style={{ color: '#fff', wordBreak: 'break-word', marginBottom: 8 }} variant="body1" gutterBottom>{key}(s)</Text>
                    {listThings[key].map((item, i) => (
                        <div key={i} className={classes.nameWrapper}>
                            <Text style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{item.name}</Text>
                            <Text style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{item.status}</Text>
                            <div>
                                <Tooltip title="Call" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                    <Icon onClick={() => handleCallNumber(Number(item.phone))} color="white" size="lg" icon="phone" />
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </AppContainer>
    );
}

export default DOJApp