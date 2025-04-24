import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../state/GroupEditor/GroupEditorSlice';
import styled from "styled-components";
import { AppDispatch } from "../../state/store";
import { GroupList } from "./GroupList";
import { ExpenseContent } from "./ExpenseContent";
import { fetchCurrentUser } from "../../state/UserEditor/UserEditorSlice";



type Props = {};
export const ExpenseBody = (props: Props) => {

    const userId = "76b06567-01d6-424d-b3d3-dd6f7ae6fa5d";
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCurrentUser(userId));
        dispatch(fetchGroups(userId));
    }, [dispatch, userId]);

    return (
        <ExpenseBodyWrapper className="flex h-[calc(100vh-64px)] dark:bg-gray-800 bg-gray-100">
            <GroupList />
            <ExpenseContent />
        </ExpenseBodyWrapper>
    );
};

const ExpenseBodyWrapper = styled.div`
`;
