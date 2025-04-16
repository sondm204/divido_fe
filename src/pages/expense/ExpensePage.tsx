import React from 'react'
import styled from 'styled-components';
import { AppHeader } from '../../components/header/AppHeader';
import { ExpenseBody } from '../../components/expense/ExpenseBody';


export const ExpensePage = () => {
    return (
        <ExpensePageWrapper>
            <AppHeader />
            <ExpenseBody />
        </ExpensePageWrapper>
    );
};

const ExpensePageWrapper = styled.div`
  height: 100%;
`;