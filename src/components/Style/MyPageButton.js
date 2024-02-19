import React from 'react';

const MyPageButton = ({children, margin}) => {
    const myButton = {
            backgroundColor: '#c62917',
            color: '#fff',
            width: '100%',
            height: '40px',
            fontSize: '15px',
            textAlign: 'center',
            borderRadius: '10px',
            margin: margin ? margin:'30px 0 20px 0'
    };
    return <button style={myButton} type="submit" >{children}</button>;
}

export default MyPageButton;
