import React from 'react';

const StyledBox = ({children, padding, lineHeight, backgroundColor}) => {
    const menuBox = {
        color: '#212121',
        width: '100%',
        margin: '8px 0 12px',
        borderRadius: '10px',
        border: '1px solid #eaeaea',
        boxSizing: 'border-box',
        backgroundColor: backgroundColor ? backgroundColor:"fff",
        padding: padding ? padding:'20px 24px',
        lineHeight: lineHeight ? lineHeight:'40px'
    };
    return <ul style={menuBox}>{children}</ul>;
}

export default StyledBox;
