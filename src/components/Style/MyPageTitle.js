import React from 'react';

const MyPageTitle = ({children}) => {
    const myTitle = {
        color: '#757575',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '24px',
        paddingLeft: '4px',
        marginTop: '10px'
    };

    return <h2 style={myTitle}>{children}</h2>;
}

export default MyPageTitle;
