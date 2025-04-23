import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";
import { CgAddR } from "react-icons/cg";
import { AppDispatch, RootState } from "../../state/store";
import { useEffect } from "react";
import { fetchBill } from "../../state/ExpenseEditor/ExpenseEditorSlice";
import { useSelector, useDispatch } from "react-redux";



type Props = {
    selectedExpenseId: string;
};

export const BillList = (props: Props) => {
    const { selectedExpenseId } = props;
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
       dispatch(fetchBill(selectedExpenseId)); 
    }, [dispatch, selectedExpenseId]);
    const bill = useSelector((state: RootState) => state.expenseEditor.find(expense => expense.id === selectedExpenseId)?.bills || []);
    console.log(bill);
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
                    {bill.map((item, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.unitPrice?.toLocaleString("de-DE") || 0}đ</td>
                            <td className="px-4 py-2">{item.totalPrice?.toLocaleString("de-DE") || 0}đ</td>
                            <td className="px-4 py-2">{item.owner.join(", ")}</td>
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