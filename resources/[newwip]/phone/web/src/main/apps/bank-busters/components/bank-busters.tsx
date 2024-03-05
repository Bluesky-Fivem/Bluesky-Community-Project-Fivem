import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Checkmark } from 'react-checkmark';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./bank-busters.styles";
import AppContainer from '../../../components/app-container';
import { useRecoilState } from 'recoil';
import { activeHoverIdState, cidState } from '../../../../atoms/activeAtom';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import { nuiAction } from '../../../../utils/nuiAction';

const BankBustersApp: React.FC = () => {
    const classes = useStyles();

    const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
    const [cid, setCid] = useRecoilState(cidState)
    const [bankData, setBankData] = useState([])
    const [heistGroup, setHeistGroup] = useState<HeistGroup | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [checkmark, setCheckmark] = useState(false)
    const [preparing, setPreparing] = useState(false)
    const [invitePlayerModal, setInvitePlayerModal] = useState(false)
    const [invitePlayerCid, setInvitePlayerCid] = useState("")
    const [confirmModal, setConfirmModal] = useState(false)

    const handleHoverActive = (e: any) => {
        setHoverId(e.currentTarget.id)
    }

    const handleHoverNotActive = () => {
        setHoverId("")
    }

    useEffect(() => {
        nuiAction('pnp-heists', 'pnp-ui:heists:getGroup', {}).then(resData => {
            if (resData.meta.ok) {
                setHeistGroup(resData.data)
            }
        });
        nuiAction('pnp-heists', 'pnp-ui:heists:getBanks', {}).then(resData => {
            if (resData.meta.ok) {
                setBankData(resData.data)
            }
        });
    }, []);

    useNuiEvent<boolean>('closeApps', () => {
        setInvitePlayerModal(false)
        setConfirmModal(false)
        setLoading(false)
        setPreparing(false)
        setCheckmark(false)
    })

    const createHeistGroup = () => {
        nuiAction('pnp-heists', 'pnp-ui:heists:createGroup', {}).then(resData => {
            if (resData.meta.ok) {
                setHeistGroup(resData.data)
            }
        });
    }

    const handleClaimBank = (id: string) => {
        //We need to make sure they are in a heist group before we can claim a bank
        //Once they click claim we put them into a queue inside heist server-side.
        //And once the bank expires a confirmation is sent out to everyone in the queue, and first to confirm gets the bank.
        //Also gotta make sure they are only queing for one bank at a time. (1 bank per group)
        nuiAction('pnp-heists', 'pnp-ui:heists:claimBank', { id }).then(resData => {
            if (resData.meta.ok) {
                //do shit
            }
        });
    }

    const handleInvitePlayer = () => {

    }

    const handleLeaveGroup = () => {
        nuiAction('pnp-heists', 'pnp-ui:heists:leaveGroup', {}).then(resData => {
            if (resData.meta.ok) {
                setHeistGroup(null)
            }
        });
    }

    const FormatExpiry = (expiry: number) => {
        const timestamp = Math.floor((expiry - new Date().valueOf()) / 1000);
        let hours = timestamp / 3600;
        let minutes = timestamp / 60;

        if (hours > 0 && minutes > 0) {
            return `${Math.floor(hours) > 0 ? Math.floor(hours) + "h" : ""} ${minutes % 60 > 0 ? Math.floor(minutes % 60) + "m" : ""}`;
        }
    }

    const IsExpired = (expiry: number) => {
        return Math.round(Date.now()) > expiry;
    }

    const IsQueued = (queue: number[]) => {
        return queue.includes(cid);
    }

    return (
        <>
            <div className={classes.bankBustersInvitePlayerModalContainer} style={{ display: invitePlayerModal ? '' : 'none' }}>
                <div className={classes.bankBustersInvitePlayerModalInnerContainer}>
                    <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
                        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
                        <Checkmark size="56px" color='#009688' />
                    </div>
                    <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
                        <div>
                            <div className="input-wrapper">
                                <FormControl fullWidth sx={{ width: '100%' }}>
                                    <TextField
                                        className={classes.input}
                                        id="input-with-icon-textfield"
                                        type="number"
                                        label="State ID"
                                        variant="standard"
                                        onChange={(e) => setInvitePlayerCid(e.target.value)}
                                        value={invitePlayerCid}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <i className="fas fa-id-card"></i>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="buttons">
                            <div>
                                <Button onClick={() => setInvitePlayerModal(false)} size="small" color="warning" variant="contained">Cancel</Button>
                            </div>
                            <div>
                                <Button onClick={handleInvitePlayer} size="small" color="success" variant="contained">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.bankBustersConfirmModalContainer} style={{ display: confirmModal ? '' : 'none' }}>
                <div className={classes.bankBustersConfirmModalInnerContainer}>
                    <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
                        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
                        <Checkmark size="56px" color='#009688' />
                    </div>
                    <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
                        <div style={{ justifyContent: 'center' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Confirm purchase</Typography>
                        </div>
                        <div className="buttons">
                            <div>
                                <Button onClick={() => setConfirmModal(false)} size="small" color="warning" variant="contained">Cancel</Button>
                            </div>
                            <div>
                                <Button onClick={() => setConfirmModal(false)} size="small" color="success" variant="contained">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AppContainer
                emptyMessage={bankData.length === 0}
                primaryActions={[
                    {
                        type: "icon",
                        title: "Create Group",
                        placement: "right",
                        icon: "fa fa-users fa-w-16",
                        action: createHeistGroup,
                        show: heistGroup === null
                    },
                    {
                        type: "icon",
                        title: heistGroup && heistGroup.leader.cid === cid ? "Disband Group" : "Leave Group",
                        placement: "right",
                        icon: "fa fa-sign-out-alt fa-w-16",
                        action: handleLeaveGroup,
                        show: heistGroup !== null
                    }
                ]}
                search={[]}
            >

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5%' }}>
                    <i className="fas fa-piggy-bank fa-3x" style={{ color: 'gold' }}></i>
                </div>

                <div className={classes.heistMembers} style={{ display: heistGroup ? '' : 'none', height: 'fit-content', marginBottom: '5%' }}>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Members</Typography>
                    {heistGroup && heistGroup.members.length > 0 ? (
                        heistGroup.members.map((member) => (
                            <div id={member.cid.toString()} key={member.cid} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                                <div className="main-container">
                                    <div className="image">
                                        <i className={`fas ${heistGroup.leader.cid === member.cid ? 'fa-user-graduate' : 'fa-user'} fa-w-16 fa-fw fa-3x`}></i>
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{member.name}</Typography>
                                        </div>
                                        <div className="description">
                                            <div className="flex-row">
                                            </div>
                                        </div>
                                    </div>
                                    <div className={hoverId.toString() === member.cid.toString() && heistGroup.leader.cid === cid && member.cid !== cid ? "actions actions-show" : "actions"}>
                                        <Tooltip title="Kick Member" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i className="fas fa-user-times fa-w-16 fa-fw fa-lg"></i>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Make Leader" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                            <div>
                                                <i className="fas fa-user-graduate fa-w-16 fa-fw fa-lg"></i>
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

                    <Button onClick={() => setInvitePlayerModal(true)} size="small" color="success" variant="contained">Invite</Button>
                </div>

                {bankData && bankData.length > 0 ? (
                    bankData.map((bank) => (
                        <div key={bank.id} id={bank.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                            <div className="main-container">
                                <div className="details">
                                    <div className="title">
                                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{bank.name}</Typography>
                                    </div>
                                    <div className="description">
                                        <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{IsExpired(bank.expires) ? '' : `Expires in ${FormatExpiry(bank.expires || 0)}`}</Typography>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{IsExpired(bank.expires) ? 'Expired' : IsQueued(bank.queue) ? 'Queued' : 'Available'}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className={hoverId?.toString() === bank?.id?.toString() && !IsExpired(bank.expires) ? "actions actions-show" : "actions"}>
                                    <Tooltip title="Claim" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                        <div>
                                            <i onClick={() => handleClaimBank(bank.id)} id={bank.id} className="fas fa-hand-holding fa-w-16 fa-fw fa-lg"></i>
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
            </AppContainer>
        </>
    );
}

export default BankBustersApp;