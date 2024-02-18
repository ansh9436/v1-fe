import React from 'react';
import styled from 'styled-components';

const Title = styled["h2"]`
    color: #757575;
    font-size: 12px;
    font-weight: bold;
    line-height: 24px;
    padding-left: 4px;
    margin-top: 10px;
`;

const MyPageTitle = ({children}) => (
    <Title>
        {children}
    </Title>
);

export default MyPageTitle;
