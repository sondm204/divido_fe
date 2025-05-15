import { useState } from "react";
import styled from "styled-components";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from "../../components/atoms/dialog/dialog";
import { Plus, Search, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setSelectedGroupId, createNewGroup, Group, removeGroup } from "../../state/GroupEditor/GroupEditorSlice";
import { GroupForm } from "./form/GroupForm";
import { User } from "../../state/UserEditor/UserEditorSlice";
import { Button } from "../atoms/button/Button";


interface GroupListProps {}

export const GroupList = (props: GroupListProps) => {
    const currentUser = useSelector((state: RootState) => state.userEditor);
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false);
    const groups = useSelector((state: RootState) => state.groupEditor.groups);
    const [newGroupData, setNewGroupData] = useState<Group>({
        id: '',
        name: '',
        users: [currentUser] as User[],
        createdAt: new Date().toISOString()
    })

    const dispatch = useDispatch<AppDispatch>();

    const handleSelectGroup = (groupId: string) => {
        dispatch(setSelectedGroupId(groupId));
    }

    const handleCreateGroup = () => {
        dispatch(createNewGroup(newGroupData));
        setIsAddingNewGroup(false);
    }

    const handleRemoveGroup = (groupId: string) => {
        dispatch(removeGroup(groupId));
    }

    return (
        <GroupListWrapper className="w-72 border-r dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col">
            {/* Sidebar */}
            {/* Tìm kiếm */}
            <div className="flex items-center gap-2 mb-4" >
                <Search className="text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Tìm nhóm..."
                    className="w-full px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm outline-none"
                />
            </div >

            {/* Danh sách nhóm */}
            <div className="flex-1 overflow-y-auto space-y-2 dark:text-white" >
                {
                    Array.isArray(groups) && groups.map((group) => (
                        <div
                            key={group.id}
                            className="flex justify-between items-center p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                            onClick={() => handleSelectGroup(group.id)}
                        >
                            <span>{group.name}</span>
                            <Trash2
                                size={20}
                                className="text-red-600 hover:scale-110 transition duration-200 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveGroup(group.id);
                                }}
                            />
                        </div>
                    ))
                }
            </div >

            {/* Nút thêm nhóm */}
            < DialogStyled open={isAddingNewGroup} onOpenChange={setIsAddingNewGroup} >
                <DialogTrigger asChild>
                    <button className="mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center">
                        <Plus size={20} />
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-md dark:text-white">
                    <DialogHeader>
                        <DialogTitle>Thêm nhóm chi tiêu</DialogTitle>
                    </DialogHeader>
                    <GroupForm type="add" groupData={newGroupData} setGroupData={setNewGroupData} />
                    <DialogFooter className="mt-4">
                        <Button type="submit" onClick={handleCreateGroup} className="bg-blue-600 text-white">
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogStyled >
        </GroupListWrapper>
    )
}

const GroupListWrapper = styled.div``

const DialogStyled = styled(Dialog)`
  
`;