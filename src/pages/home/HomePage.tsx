import { HomeBody } from '../../components/molecules/home/HomeBody';
import { AppHeader } from '../../components/molecules/header/AppHeader';
import styled from "styled-components";



export const HomePage = () => {
    return (
        <HomePageWrapper>
            <AppHeader />
            <HomeBody />
        </HomePageWrapper>
    );
}

const HomePageWrapper = styled.div`
    height: 100%;
`;