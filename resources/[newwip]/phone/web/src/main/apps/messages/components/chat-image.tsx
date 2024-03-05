import React, { useState } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { Popper } from '@mui/material';

const ChatImage: React.FC<ChatImageProps> = (props) => {
  const [open, setOpen] = useState(false)
  const [imageHovered, setImageHovered] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleImageHoverActive = () => {
    if (!open) { return }
    setImageHovered(true)
  }

  const handleImageHoverNotActive = () => {
    setImageHovered(false)
  }

  useNuiEvent<boolean>('closeApps', () => {
    setOpen(false)
    setImageHovered(false)
  })

  const urls = props.message.match(/\b(http|https)?(:\/\/)?(\S*)\.(\w{2,4})(.*)/g)
  const str = props.message.split(urls[0])[0]
  const shit = '\n\n Images Attached: ' + urls[0].split(' ').length

  return (
    <>
      <div onClick={handleOpen} className="component-image-container" style={{ marginBottom: '5%' }}>
        <div>
          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{shit}</Typography>
        </div>
        <div className={open ? 'container' : 'container container-max-height'}>
          <div className="blocker" style={{ display: open ? 'none' : '' }}>
            <i className="fas fa-eye fa-w-18 fa-fw fa-3x" style={{ color: 'black', marginTop: '1%', textShadow: '0 0 black' }}></i>
            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Click to View</Typography>
            <Typography style={{ color: '#fff', textAlign: 'center' }} variant="body2" gutterBottom>Only reveal images from those you know are not total pricks</Typography>
          </div>

          <div onMouseEnter={handleImageHoverActive} onMouseLeave={handleImageHoverNotActive} className={open ? 'image' : ''} style={{ backgroundImage: open ? `url(${urls[0].split(' '[0])})` : '' }}>

          </div>
          <div className="spacer"></div>


        </div>
        <Popper
          open={imageHovered}
          style={{ top: '49%', left: '42%' }}
          placement='bottom-end'
          disablePortal={false}
          modifiers={[
            {
              name: 'flip',
              enabled: false,
              options: {
                altBoundary: false,
                rootBoundary: 'document',
                padding: 8,
              },
            },
            {
              name: 'preventOverflow',
              enabled: false,
              options: {
                altAxis: false,
                altBoundary: true,
                tether: false,
                rootBoundary: 'document',
                padding: 8,
              },
            },
          ]}
        >
          <div>
            <img alt="useful" src={urls[0].split(' '[0])} style={{ maxHeight: '600px', maxWidth: '800px' }}></img>
          </div>
        </Popper>
      </div>
      <div className={`inner ${props.sender === props.clientNumber ? 'inner-out' : 'inner-in'}`}>
        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{str}</Typography>
      </div>
    </>
  );
}

export default ChatImage