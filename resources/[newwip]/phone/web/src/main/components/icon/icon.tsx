import React from 'react';

interface IconProps {
    color: any;
    size: any;
    icon: any;
    onClick: any;
}

const Icon: React.FC<IconProps> = (props) => {
    return (
        <>
        <i onClick={props.onClick} className={`fas fa-${props.icon} fa-${props.size}`} style={{color: props.color}}>{props.children}</i>
        </>
    );
}

export default Icon;