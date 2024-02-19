import React from 'react';

const StyledContainer = ({children}) => {
    const myContainer = {
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'row wrap'
    };
    return <div style={myContainer}>{children}</div>;
}

export default StyledContainer;
