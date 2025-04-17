import React from "react";
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





type Props = {};
export const ExpenseBody = (props: Props) => {

    const [isAddingNewGroup, setIsAddingNewGroup] = React.useState(false);


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
        <ExpenseBodyWrapper>
            <div className="flex h-[calc(100vh-64px)] dark:bg-gray-800 bg-gray-100">
                {/* Sidebar */}
                <aside className="w-72 border-r dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col">
                    {/* Tìm kiếm */}
                    <div className="flex items-center gap-2 mb-4">
                        <Search className="text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm nhóm..."
                            className="w-full px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm outline-none"
                        />
                    </div>

                    {/* Danh sách nhóm */}
                    <div className="flex-1 overflow-y-auto space-y-2 dark:text-white">
                        <div className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer">
                            Phòng trọ A
                        </div>
                        <div className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer">
                            Công ty ABC
                        </div>
                    </div>

                    {/* Nút thêm nhóm */}
                    <DialogStyled open={isAddingNewGroup} onOpenChange={setIsAddingNewGroup}>
                        <DialogTrigger asChild>
                            <button className="mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center">
                                <Plus size={20} />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Thêm nhóm chi tiêu</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
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
                            </DialogDescription>

                            <DialogFooter className="mt-4">
                                <Button type="submit" className="bg-blue-600 text-white">
                                    Lưu thay đổi
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogStyled>
                </aside>

                {/* Phần nội dung bên phải */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Tên nhóm */}
                    <div className="flex gap-2 items-center text-xl font-bold mb-4 dark:text-white">
                        <h2>Phòng trọ A</h2>
                        <Dialog>
                            <DialogTrigger>
                                <FaRegEdit className="hover:text-blue-600 transition ease-in-out duration-200" />
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Chỉnh sửa nhóm chi tiêu</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
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
                                </DialogDescription>

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
                            <DialogTrigger>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                                    + Thêm chi tiêu
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Tạo chi tiêu</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
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
                                </DialogDescription>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Bảng chi tiêu */}
                    <ExpenseList />
                </main>
            </div>
        </ExpenseBodyWrapper>
    );
};

const ExpenseBodyWrapper = styled.div`
    height: 100%;
`;

const DialogStyled = styled(Dialog)`
  
`;