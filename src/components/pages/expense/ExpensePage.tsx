import { ExpenseBody } from '@/components/molecules/ExpenseBody';
import { AppHeader } from '@/components/molecules/header/AppHeader';
import styled from 'styled-components';

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