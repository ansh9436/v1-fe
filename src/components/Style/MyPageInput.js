import React from 'react';

const MyPageInput = ({...children}) => {
    const myInput = {
        backgroundColor: '#f9f9f9',
        width: '100%',
        height: '40px',
        padding: '0 10px',
        margin: '4px 0',
        border: '1px solid #efefef',
        borderRadius: '10px',
        boxSizing: 'border-box'
    };

    return <input style={myInput} {...children} />;
}

export default MyPageInput;
