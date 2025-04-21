import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../state/GroupEditor/GroupEditorSlice';
import styled from "styled-components";
import { Plus, Search, X } from 'lucide-react';
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import { Input } from '../../components/ui/input';
import { FaRegEdit } from 'react-icons/fa';
import { Label } from "../ui/label";
import { Button } from "../commons/Button";
import { ExpenseList } from "./ExpenseList";
import { Pencil, Trash2 } from "lucide-react";
import { TbListDetails } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { AppDispatch, RootState } from "../../state/store";
import { GroupList } from "./GroupList";
import { ExpenseContent } from "./ExpenseContent";



type Props = {};
export const ExpenseBody = (props: Props) => {

    const userId = "76b06567-01d6-424d-b3d3-dd6f7ae6fa5d";

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
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
