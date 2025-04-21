import React from "react";
import styled from "styled-components";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import { Plus, Search, X } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setSelectedGroupId } from "../../state/GroupEditor/GroupEditorSlice";
import { Input } from '../../components/ui/input';
import { Label } from "../ui/label";
import { Button } from "../commons/Button";



type Props = {}

export const GroupList = (props: Props) => {
    const [isAddingNewGroup, setIsAddingNewGroup] = React.useState(false);
    const groups = useSelector((state: RootState) => state.groupEditor.groups);

    const dispatch = useDispatch<AppDispatch>();

    const TagInputMock = () => {
        return (
            <div className="border rounded-md p-2 flex flex-wrap gap-2 bg-white dark:bg-gray-800 min-h-[48px]">
                {/* Tag 1 */}
                <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm dark:bg-blue-900 dark:text-blue-100">
                    alice@gmail.com
                    <button className="ml-1 text-blue-600 hover:text-red-500 dark:text-blue-300 dark:hover:text-red-400">
                        <X size={14} />
                    </button>
                </div>

                {/* Tag 2 */}
                <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm dark:bg-blue-900 dark:text-blue-100">
                    bob@example.com
                    <button className="ml-1 text-blue-600 hover:text-red-500 dark:text-blue-300 dark:hover:text-red-400">
                        <X size={14} />
                    </button>
                </div>

                {/* Input field */}
                <input
                    className="flex-1 min-w-[120px] px-2 py-1 text-sm outline-none bg-transparent"
                    placeholder="Thêm thành viên..."
                />
            </div>
        );
    }

    const handleSelectGroup = (groupId: string) => {
        dispatch(setSelectedGroupId(groupId));
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
                    groups.map((group) => (
                        <div
                            key={group.id}
                            className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                            onClick={() => handleSelectGroup(group.id)}
                        >
                            {group.name}
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
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Thêm nhóm chi tiêu</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-medium">Tên nhóm</Label>
                            <Input placeholder="Nhập tên nhóm" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-medium">Số lượng người</Label>
                            <Input defaultValue={0} disabled />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-medium">Thành viên</Label>
                            <TagInputMock />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Ngày tạo</label>
                            <Input type="date" value={new Date().toISOString().split('T')[0]} disabled />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" className="bg-blue-600 text-white">
                            Lưu thay đổi
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