import React, { useState } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import { useRecoilState } from 'recoil';
import { Tooltip } from '@mui/material';
import { activeHoverIdState } from '../../../../atoms/activeAtom';

const SportsbookDropdown: React.FC<SportsbookProps> = (props) => {
    const [expanded, setExpanded] = useState(false)
    const [hoverId, setHoverId] = useRecoilState(activeHoverIdState)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleHover = (id: string) => {
        setHoverId(id)
    }

    const handlePlaceBet = (e: any) => {
        e.stopPropagation();
    }

    return (
        <>
            <div key={props.id} id={props.id} className="component-paper cursor-pointer" onClick={handleExpandClick} onMouseEnter={(e) => handleHover(props.id)} onMouseLeave={() => handleHover("")}>
                <div className="main-container">
                    <div className="image">
                        <i className={`${props.icon} fa-w-16 fa-fw fa-3x`}></i>
                    </div>
                    <div className="details">
                        <div className="title">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.name}</Typography>
                        </div>
                        <div className="description">
                            <div className="flex-row">
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.description}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={hoverId.toString() === props.id.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Place Bet" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div>
                                <i onClick={handlePlaceBet} id={props.id} className="fas fa-dollar-sign fa-w-16 fa-fw fa-lg"></i>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            variant="standard"
                            value="Bovice ($323k / 66.5%)"
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <i className="fas fa-funnel-dollar" style={{color: 'white'}}></i>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            variant="standard"
                            value="Kael Soze ($162k / 33.5%)"
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <i className="fas fa-funnel-dollar" style={{color: 'white'}}></i>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </Collapse>
            </div>
        </>
    )
}

export default SportsbookDropdown