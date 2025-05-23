import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "../../components/atoms/dialog/dialog";
import { TbListDetails } from "react-icons/tb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../state/GroupEditor/GroupEditorSlice";
import { Expense } from '../../state/ExpenseEditor/ExpenseEditorSlice';
import { format } from 'date-fns';
import { BillList } from "./BillList";
import { Pencil, Save, Trash2 } from "lucide-react";
import { CgAddR } from "react-icons/cg";
import { Input } from '../../components/atoms/input/input';
interface ExpenseProps {
    selectedGroupId: string | null
};

export const ExpenseList = (props: ExpenseProps) => {
    const { selectedGroupId } = props;
    const dispatch = useDispatch<AppDispatch>();
    const selectedGroup = useSelector((state: RootState) =>
        Array.isArray(state.groupEditor.groups)
            ? state.groupEditor.groups.find((g) => g.id === selectedGroupId)
            : null
    );
    const users = selectedGroup?.users || [];
    const categories = selectedGroup?.categories || [];

    useEffect(() => {
        if (selectedGroupId && selectedGroup?.expenses?.length === 0) {
            dispatch(fetchExpenses(selectedGroupId));
        }
    }, [selectedGroupId]);

    const expenseList = useSelector((state: RootState) => state.groupEditor.groups?.find((g) => g.id === selectedGroupId)?.expenses);

    const [editExpenseId, setEditExpenseId] = useState<string | null>(null);
    const [editDate, setEditDate] = useState<Date>();
    const [editCategory, setEditCategory] = useState<string>();
    const [editPayer, setEditPayer] = useState<string>();
    const [editAmount, setEditAmount] = useState<number>();
    const [editNote, setEditNote] = useState<string>();

    const handleEditExpense = (expenseId: string) => {
        setEditExpenseId(expenseId);
        const editExpense = expenseList?.find((expense) => expense.id === expenseId);
        setEditDate(editExpense?.spentAt || new Date());
        setEditCategory(editExpense?.category.name);
        setEditPayer(editExpense?.payer.name);
        setEditAmount(editExpense?.amount);
        setEditNote(editExpense?.note);
    }


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
                    {Array.isArray(expenseList) && expenseList.map((item: Expense, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">
                                {item.id === editExpenseId ? (
                                    <Input
                                        type="date"
                                        defaultValue={editDate && format(editDate, "yyyy-MM-dd")}
                                        onChange={(e) => {

                                        }}
                                    />
                                ) : (
                                    format(item.spentAt, "dd/MM/yyyy")
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {item.id === editExpenseId ? (
                                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    item.category.name
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {item.id === editExpenseId ? (
                                    <select value={editPayer} onChange={(e) => setEditPayer(e.target.value)}>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.name}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    item.payer.name
                                )}
                            </td>
                            <td className="px-4 py-2 flex items-center">
                                {item.id === editExpenseId ? (
                                    <Input
                                        type="number"
                                        defaultValue={editAmount}
                                        onChange={(e) => {

                                        }}
                                    />
                                ) : (
                                    item.amount.toLocaleString("de-DE")
                                )}
                                đ
                            </td>
                            <td className="px-4 py-2">
                                {item.id === editExpenseId ? (
                                    <Input
                                        type="text"
                                        defaultValue={editNote}
                                    />
                                ) : (
                                    item.note
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {item.shareRatios.map(ratio => ratio.ratio).join(":")}
                            </td>
                            <td className="flex gap-2 px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <Dialog>
                                        <DialogTrigger>
                                            <TbListDetails size={20} className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Chi tiết hóa đơn ngày 11/02/2025</DialogTitle>
                                            </DialogHeader>

                                            <BillList selectedExpenseId={item.id} />
                                        </DialogContent>
                                    </Dialog>
                                    {item.id === editExpenseId ? (
                                        <Save
                                            size={20}
                                            className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer"
                                            onClick={() => setEditExpenseId(null)}
                                        />
                                    ) : (
                                        <Pencil
                                            size={20}
                                            className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer"
                                            onClick={() => handleEditExpense(item.id)}
                                        />
                                    )}
                                    <Trash2
                                        size={20}
                                        className="text-lg hover:text-red-600 transition ease-in-out duration-200 cursor-pointer"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={6} className="px-2 py-2">
                            <CgAddR className="text-xl hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
} 