import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { TbListDetails } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { useEffect } from "react";



type Props = {
    selectedGroupId: string | null
};

export const ExpenseList = (props: Props) => {
    const { selectedGroupId } = props;
    useEffect(() => {
        console.log(selectedGroupId);
    }, [selectedGroupId])
    const DetailsIcon = TbListDetails as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const mockData = [
        { name: "Sữa tươi", quantity: 2, price: 28000, owner: "An" },
        { name: "Bánh mì", quantity: 5, price: 10000, owner: "Bình" },
        { name: "Trứng gà", quantity: 1, price: 32000, owner: "Chi" },
    ];
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
                    <tr>
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2">02/04/2025</td>
                        <td className="px-4 py-2">Ăn uống</td>
                        <td className="px-4 py-2">Nam</td>
                        <td className="px-4 py-2">120,000đ</td>
                        <td className="px-4 py-2">Rau, Thịt</td>
                        <td className="px-4 py-2">1:1</td>
                        <td className="flex gap-2 px-4 py-2">
                            <Dialog>
                                <DialogTrigger>
                                    <DetailsIcon className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>Chi tiết hóa đơn ngày 11/02/2025</DialogTitle>
                                    </DialogHeader>

                                    <div className="overflow-hidden max-h-[400px] rounded-lg shadow-lg">
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
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">2</td>
                        <td className="px-4 py-2">03/04/2025</td>
                        <td className="px-4 py-2">Tiện ích</td>
                        <td className="px-4 py-2">Minh</td>
                        <td className="px-4 py-2">300,000đ</td>
                        <td className="px-4 py-2">Tiền điện, tiền ga</td>
                        <td className="px-4 py-2">1:1</td>
                        <td className="px-4 py-2">1:1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
} 