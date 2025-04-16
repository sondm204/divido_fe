import styled from "styled-components";
import { HomeBody } from "../../components/home/HomeBody";
import { AppHeader } from "../../components/header/AppHeader";

type Props = {}

export const HomePage = ({}: Props) => {
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