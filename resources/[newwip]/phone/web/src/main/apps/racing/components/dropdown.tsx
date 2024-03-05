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
import { fetchNui } from '../../../../utils/fetchNui';
import { Tooltip } from '@mui/material';

const Dropdown: React.FC<RacingProps> = (props) => {
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

    const handleEndRace = (e: any) => {
        e.stopPropagation()
        fetchNui('endRace', { id: e.currentTarget.id })
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
                    <div className={hoverId.toString() === props.id.toString() && props.cid.toString() === props.data.owner.toString() && props.type === "active" ? "actions actions-show" : "actions"}>
                        <Tooltip title="End Race" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div style={{ display: props.cid.toString() === props.data.owner.toString() /*&& race.open === true*/ ? '' : 'none' }}>
                                <i id={props.id} onClick={handleEndRace} className="fas fa-trash-alt fa-w-16 fa-fw fa-lg"></i>
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

export default Dropdown