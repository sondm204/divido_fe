import styled from "styled-components";
import { HomeBody } from "../../components/home/HomeBody";
import { AppHeader } from "../../components/header/AppHeader";


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