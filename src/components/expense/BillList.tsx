import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";
import { CgAddR } from "react-icons/cg";



export const BillList = () => {
    const mockData = [
        { name: "Sữa tươi", quantity: 2, price: 28000, owner: "An" },
        { name: "Bánh mì", quantity: 5, price: 10000, owner: "Bình" },
        { name: "Trứng gà", quantity: 1, price: 32000, owner: "Chi" },
    ];

    return (
        <BillListWrapper className="overflow-hidden max-h-[400px] rounded-lg shadow-lg">
            <table className="w-full text-sm dark:text-gray-300">
                <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                    <tr>
                        <th className="px-4 py-2">Tên món</th>
                        <th className="px-4 py-2">Số lượng</th>
                        <th className="px-4 py-2">Đơn giá</th>
                        <th className="px-4 py-2">Tổng tiền</th>
                        <th className="px-4 py-2">Chủ nhân</th>
                        <th className="px-4 py-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-300">
                    {mockData.map((item, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.price.toLocaleString()}đ</td>
                            <td className="px-4 py-2">{(item.quantity * item.price).toLocaleString()}đ</td>
                            <td className="px-4 py-2">{item.owner}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <Pencil size={16} className="hover:scale-110 transition ease-in-out duration-200 cursor-pointer" />
                                <Trash2 size={16} className="text-red-500 hover:scale-110 transition ease-in-out duration-200 cursor-pointer" />
                            </td>
                        </tr>
                    ))}

                    {/* ✅ Dòng chứa nút Thêm */}
                    <tr>
                        <td colSpan={6} className="px-2 py-2">
                            <CgAddR className="text-xl hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </BillListWrapper>
    )
}

const BillListWrapper = styled.div``