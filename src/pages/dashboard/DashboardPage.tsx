import styled from "styled-components";
import { DashboardBody } from "../../components/dashboard/DashboardBody";
import { AppHeader } from "../../components/header/AppHeader";

type Props = {}

export const DashboardPage = ({}: Props) => {
    return (
        <DashboardPageWrapper>
            <AppHeader />
            <DashboardBody />
        </DashboardPageWrapper>
    );
}

const DashboardPageWrapper = styled.div`
    height: 100%;
`;