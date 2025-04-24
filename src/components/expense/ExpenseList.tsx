import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import { TbListDetails } from "react-icons/tb";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../state/ExpenseEditor/ExpenseEditorSlice";
import { Expense } from '../../state/ExpenseEditor/ExpenseEditorSlice';
import { format } from 'date-fns';
import { BillList } from "./BillList";

type Props = {
    selectedGroupId: string | null
};

export const ExpenseList = (props: Props) => {
    const { selectedGroupId } = props;
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchExpenses(selectedGroupId || ""));
    }, [dispatch, selectedGroupId]);

    const expenseList = useSelector((state: RootState) => state.expenseEditor);

 
    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <tr>
                        <th className="px-4 py-2">STT</th>
                        <th className="px-4 py-2">Ngày</th>
                        <th className="px-4 py-2">Danh mục</th>
                        <th className="px-4 py-2">Người chi</th>
                        <th className="px-4 py-2">Tổng tiền</th>
                        <th className="px-4 py-2">Danh sách món đồ</th>
                        <th className="px-4 py-2">Chia sẻ</th>
                        <th className="px-4 py-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-300">
                    {expenseList.map((item: Expense, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{format(item.spentAt, "dd/MM/yyyy")}</td>
                            <td className="px-4 py-2">{item.category.name}</td>
                            <td className="px-4 py-2">{item.payer.name}</td>
                            <td className="px-4 py-2">{item.amount}</td>
                            <td className="px-4 py-2">{item.note}</td>
                            <td className="px-4 py-2">
                                {item.shareRatios.map(ratio => ratio.ratio).join(":")}
                            </td>
                            <td className="flex gap-2 px-4 py-2">
                                <Dialog>
                                    <DialogTrigger>
                                        <TbListDetails className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Chi tiết hóa đơn ngày 11/02/2025</DialogTitle>
                                        </DialogHeader>

                                        <BillList selectedExpenseId={item.id} />
                                    </DialogContent>
                                </Dialog>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 