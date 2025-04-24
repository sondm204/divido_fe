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



export const ExpenseContent = () => {
    const selectedGroupId = useSelector((state: RootState) => state.groupEditor.selectedGroupId);
    const selectedGroup = useSelector((state: RootState) => state.groupEditor.groups.find((g) => g.id === selectedGroupId));
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

    return (
        <ExpenseContentWrapper className="flex-1 p-6 overflow-y-auto">
            {/* Tên nhóm */}
            <div className="flex gap-2 items-center text-xl font-bold mb-4 dark:text-white">
                <h2>{selectedGroup?.name}</h2>
                <Dialog>
                    <DialogTrigger>
                        <FaRegEdit className="hover:text-blue-600 transition ease-in-out duration-200" />
                    </DialogTrigger>
                    <DialogContent className="max-w-md dark:text-white">
                        <DialogHeader>
                            <DialogTitle>Chỉnh sửa nhóm chi tiêu</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm font-medium">Tên nhóm</Label>
                                <Input value='Phòng trọ A' />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-sm font-medium">Số lượng người</Label>
                                <Input value='3' disabled />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-sm font-medium">Thành viên</Label>
                                <TagInputMock />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Ngày tạo</label>
                                <Input value='01/01/2025' disabled />
                            </div>
                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="submit" className="bg-blue-600 text-white">
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
