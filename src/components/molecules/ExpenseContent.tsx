import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Group, fetchUsersByGroup, fetchCategoriesByGroup, updateGroup } from '../../state/GroupEditor/GroupEditorSlice';
import styled from "styled-components";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from "../../components/atoms/dialog/dialog";
import { Input } from '../../components/atoms/input/input'
import { FaRegEdit } from 'react-icons/fa';
import { ExpenseList } from "./ExpenseList";
import { Trash2 } from "lucide-react";
import { TbListDetails } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { GroupForm } from "./form/GroupForm";
import { AppDispatch, RootState } from "../../state/store";
import { Button } from "../atoms/button/Button";
import { Label } from "../atoms/label/label";



export const ExpenseContent = () => {
    const selectedGroupId = useSelector((state: RootState) => state.groupEditor.selectedGroupId);
    const selectedGroup = useSelector((state: RootState) => 
        Array.isArray(state.groupEditor.groups) 
            ? state.groupEditor.groups.find((g) => g.id === selectedGroupId)
            : null
    );
    const [groupData, setGroupData] = useState<Group>();
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);

    useEffect(() => {
        if (selectedGroup) {
            setGroupData({
                id: selectedGroup.id,
                name: selectedGroup.name,
                users: selectedGroup.users || [],
                createdAt: selectedGroup.createdAt
            });
        }

        if (selectedGroupId && !selectedGroup?.users) {
            dispatch(fetchUsersByGroup(selectedGroupId));
        }

        if (selectedGroupId && !selectedGroup?.categories) {
            dispatch(fetchCategoriesByGroup(selectedGroupId));
        }
    }, [selectedGroupId]);

    const handleEditGroup = async () => {
        if (groupData) {
            await dispatch(updateGroup(groupData));
            setIsOpenEditGroup(false);
        }
    }

    return (
        <ExpenseContentWrapper className="flex-1 p-6 overflow-y-auto">
            {/* Tên nhóm */}
            <div className="flex gap-2 items-center text-xl font-bold mb-4 dark:text-white">
                <h2>{selectedGroup?.name}</h2>
                <Dialog open={isOpenEditGroup} onOpenChange={setIsOpenEditGroup}>
                    <DialogTrigger>
                        <FaRegEdit className="hover:text-blue-600 transition ease-in-out duration-200" />
                    </DialogTrigger>
                    <DialogContent className="max-w-md dark:text-white">
                        <DialogHeader>
                            <DialogTitle>Chỉnh sửa nhóm chi tiêu</DialogTitle>
                        </DialogHeader>
                        <GroupForm type="edit" groupData={groupData as Group} setGroupData={setGroupData} />
                        <DialogFooter className="mt-4">
                            <Button onClick={handleEditGroup} type="submit" className="bg-blue-600 text-white">
                                Lưu thay đổi
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Nút thêm chi tiêu */}
            <div className="flex justify-end mb-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                            + Thêm chi tiêu
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md dark:text-white">
                        <DialogHeader>
                            <DialogTitle>Tạo chi tiêu</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm font-medium">Ngày</Label>
                                <Input type="date" value={new Date().toISOString().split('T')[0]} />
                            </div>

                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1 w-[calc(50%-5px)]">
                                    <Label className="text-sm font-medium">Danh mục</Label>
                                    <select className="w-full px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm outline-none">
                                        <option>Danh mục 1</option>
                                        <option>Danh mục 2</option>
                                        <option>Danh mục 3</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1 w-[calc(50%-5px)]">
                                    <Label className="text-sm font-medium">Người chi</Label>
                                    <select className="w-full px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm outline-none">
                                        <option>Danh mục 1</option>
                                        <option>Danh mục 2</option>
                                        <option>Danh mục 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Tổng tiền</label>
                                <Input />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Danh sách mua đồ</label>
                                <div className="flex gap-1">
                                    <Input />
                                    <Dialog>
                                        <DialogTrigger>
                                            <TbListDetails className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Chi tiết hóa đơn ngày 11/02/2025</DialogTitle>
                                            </DialogHeader>

                                            <div className="overflow-hidden max-h-[400px] rounded-lg shadow-lg">
                                                <table className="w-full text-sm dark:text-gray-300">
                                                    <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                                                        <tr>
                                                            <th className="px-2 py-2">Tên món</th>
                                                            <th className="w-[12%] px-2 py-2">Số lượng</th>
                                                            <th className="w-[12%] px-2 py-2">Đơn giá</th>
                                                            <th className="w-[20%] px-2 py-2">Tổng tiền</th>
                                                            <th className="px-2 py-2">Chủ nhân</th>
                                                            <th className="px-2 py-2">Thao tác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-300">
                                                        <tr >
                                                            <td className="px-2 py-2"><Input /></td>
                                                            <td className="px-2 py-2"><Input /></td>
                                                            <td className="px-2 py-2">
                                                                <div className="flex gap-1 items-center">
                                                                    <span>0</span>đ
                                                                </div>
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <div className="flex gap-1 items-center">
                                                                    <Input />đ
                                                                </div>
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <select className="w-full px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm outline-none">
                                                                    <option>Danh mục 1</option>
                                                                    <option>Danh mục 2</option>
                                                                    <option>Danh mục 3</option>
                                                                </select>
                                                            </td>
                                                            <td className="px-2 py-2">
                                                                <Trash2 size={16} className="text-red-500 hover:scale-110 transition ease-in-out duration-200 cursor-pointer" />
                                                            </td>
                                                        </tr>

                                                        {/* ✅ Dòng chứa nút Thêm */}
                                                        <tr>
                                                            <td colSpan={6} className="px-2 py-2">
                                                                <CgAddR className="text-xl hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Lưu</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Chia sẻ</label>
                                <Input />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Bảng chi tiêu */}
            <ExpenseList selectedGroupId={selectedGroupId} />
        </ExpenseContentWrapper>
    )
}

const ExpenseContentWrapper = styled.div``
