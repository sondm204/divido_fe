import React, { useEffect, useState } from "react";

import { X } from 'lucide-react';
import { Input } from '../../../components/atoms/input/input';
import { Label } from "../../atoms/label/label";
import { User } from "../../../state/UserEditor/UserEditorSlice";
import { getUserByEmail } from "../../../services/UserService";
import { Group } from "../../../state/GroupEditor/GroupEditorSlice";
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";

type Props = {
    type: 'add' | 'edit',
    groupData: Group,
    setGroupData: any
}

export const GroupForm = (props: Props) => {
    const { type, groupData, setGroupData } = props;

    const currentUser = useSelector((state: RootState) => state.userEditor);

    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const [searchUser, setSearchUser] = useState<User>();
    const [searchEmail, setSearchEmail] = useState<string>('');

    useEffect(() => {
        if (type === 'add') {
            setGroupData({ ...groupData, users: [currentUser] });
        }
    }, []);

    function checkEmailSuffix(text: string) {
        const regex = /@(gmail\.com|yahoo\.com|outlook\.com)$/;
        return regex.test(text);
    }
    const handleSearchUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setSearchEmail(email);

        if (email && checkEmailSuffix(email)) {
            const user = await getUserByEmail({ email });
            if (user) {
                setSearchUser(user);
                setIsOpenDropDown(true);
            } else {
                setIsOpenDropDown(false);
            }
        } else {
            setIsOpenDropDown(false);
        }

    };

    const handleChooseUser = () => {
        if (searchUser) {
            setIsOpenDropDown(false);
            setSearchEmail('');
            if (groupData.users?.find((user) => user.id === searchUser.id)) {
                return;
            }
            setGroupData({ ...groupData, users: [...groupData.users || [], searchUser] });
        }
    }

    const removeChooseUser = (userId: string) => {
        setGroupData({ ...groupData, users: groupData.users?.filter((user) => user.id !== userId) });
    }

    const handleGroupNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupData({ ...groupData, name: e.target.value });
    }

    return (
        <div className="space-y-4 mt-2">
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Tên nhóm</Label>
                <Input
                    placeholder="Nhập tên nhóm"
                    value={groupData.name}
                    onChange={handleGroupNameInputChange} />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Số lượng người</Label>
                <Input value={groupData.users?.length} disabled />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Thành viên</Label>
                <div className="relative border rounded-md p-2 flex flex-wrap gap-2 bg-white dark:bg-gray-800 min-h-[48px]">
                    {/* Tag 1 */}
                    {Array.isArray(groupData.users) && groupData.users?.map((user) => (
                        <div key={user.id} className="flex items-center bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm dark:bg-blue-900 dark:text-blue-100">
                            {user.id === currentUser.id ? 'Tôi' : user.name}
                            {user.id !== currentUser.id && (
                                <button className="ml-1 text-blue-600 hover:text-red-500 dark:text-blue-300 dark:hover:text-red-400">
                                    <X size={14} onClick={() => removeChooseUser(user.id)} />
                                </button>
                            )}
                        </div>
                    ))}
                    {/* Input field */}
                    <input
                        className="flex-1 min-w-[120px] px-2 py-1 text-sm outline-none bg-transparent"
                        placeholder="Thêm thành viên..."
                        value={searchEmail}
                        onChange={handleSearchUser}
                    />

                    <div className={`${isOpenDropDown ? 'block' : 'hidden'} absolute z-50 top-full left-0 w-full rounded-lg bg-white border dark:border-white dark:bg-gray-800 shadow`}>
                        <div onClick={handleChooseUser} className="flex items-center gap-2 overflow-y-auto rounded-lg px-2 py-2 max-h-40 hover:bg-gray-100 dark:hover:bg-gray-500 shadow-lg cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                                <img
                                    src="https://i.pravatar.cc/100" // Ảnh avatar mẫu
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col dark:text-white">
                                <div className="font-medium">{searchUser?.name}</div>
                                <div className="text-gray-400 text-sm">{searchUser?.email}</div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <TagInputMock /> */}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Ngày tạo</label>
                <Input type="date" value={groupData.createdAt.split('T')[0]} disabled />
            </div>
        </div>
    )
};