import React, { useState } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import { Tooltip } from '@mui/material';
import { fetchNui } from '../../../../utils/fetchNui';

const Pending: React.FC<PendingProps> = (props) => {
    const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?

    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleHoverActive = (e: any) => {
        setHoverId(e.currentTarget.id)
    }

    const handleHoverNotActive = () => {
        setHoverId("")
    }

    const handleLeaveRace = (e: any) => {
        e.stopPropagation()
        fetchNui('leaveRace', { id: e.currentTarget.id })
    }

    const handleStartRace = (id: string, countdown: number) => {
        fetchNui('startRace', { id: id, countdown: countdown })
    }

    const handleSetGPS = (e: any) => {
        e.stopPropagation()
        fetchNui('locateRace', { id: e.currentTarget.id })
    }

    const handleJoinRace = (e: any) => {
        e.stopPropagation()
        fetchNui('joinRace', { id: e.currentTarget.id })
    }

    const handlePreviewRace = (e: any) => {
        e.stopPropagation()
        fetchNui('previewRace', { id: e.currentTarget.id })
    }

    return (
        <>
            <div key={props.id} id={props.id} className="component-paper cursor-pointer" onClick={handleExpandClick} onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                <div className="main-container">
                    <div className="details">
                        <div className="title">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.name}</Typography>
                        </div>
                        <div className="description">
                            <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.lapText}</Typography>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.distText}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={hoverId.toString() === props.id.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Leave Race" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div style={{ display: props.data["players"][props.cid] /*&& race.open === true*/ ? '' : 'none' }}>
                                <i id={props.id} onClick={handleLeaveRace} className="fas fa-user-times fa-w-16 fa-fw fa-lg"></i>
                            </div>
                        </Tooltip>
                        <Tooltip title="Start Race" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div style={{ display: props.data.owner.toString() === props.cid.toString() && props.data["players"][props.cid] ? '' : 'none' }}>
                                <i id={props.id} onClick={() => handleStartRace(props.id, props.data.countdown)} className="fas fa-play fa-w-16 fa-fw fa-lg"></i>
                            </div>
                        </Tooltip>
                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div>
                                <i id={props.id} onClick={handleSetGPS} className="fas fa-map-marker fa-w-16 fa-fw fa-lg"></i>
                            </div>
                        </Tooltip>
                        <Tooltip title="Preview Race" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div>
                                <i id={props.id} onClick={handlePreviewRace} className="fas fa-map fa-w-16 fa-fw fa-lg"></i>
                            </div>
                        </Tooltip>
                        <Tooltip title="Join Race" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div style={{ display: !props.data["players"][props.cid] ? '' : 'none' }}>
                                <i id={props.id} onClick={handleJoinRace} className="fas fa-user-plus fa-w-16 fa-fw fa-lg"></i>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {props.players && Object.keys(props.players).length > 0 ? (
                        Object.values(props.players).map((player, index) => (
                            <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    variant="standard"
                                    value={player.name}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fas fa-user"></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        ))
                    ) : (
                        <></>
                    )}
                </Collapse>
            </div>
        </>
    )
}

export default Pending