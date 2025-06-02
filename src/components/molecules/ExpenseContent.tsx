import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Group,
  fetchUsersByGroup,
  fetchCategoriesByGroup,
  updateGroup,
  fetchGroup,
} from "../../state/GroupEditor/GroupEditorSlice";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { ExpenseList } from "./ExpenseList";
import { Trash2 } from "lucide-react";
import { TbListDetails } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { GroupForm } from "./form/GroupForm";
import { AppDispatch, RootState } from "../../state/store";
import { Label } from "../atoms/label/label";
import { Button } from "../atoms/button/Button";
import CustomDialog from "../atoms/dialog/Dialog";
import { Input } from "../atoms/input/input";
import { DatePicker } from "../atoms/date-picker/DatePicker";
import dayjs from "dayjs";
import { Select } from "../atoms/select/Select";
import {
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import MUISelect from "@mui/material/Select";

export const ExpenseContent = () => {
  const selectedGroupId = useSelector(
    (state: RootState) => state.groupEditor.selectedGroupId
  );
  const selectedGroup = useSelector((state: RootState) =>
    Array.isArray(state.groupEditor.groups)
      ? state.groupEditor.groups.find((g) => g.id === selectedGroupId)
      : null
  );
  const [groupData, setGroupData] = useState<Group>();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
  const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenBuyList, setIsOpenBuyList] = useState(false); // isOpenBuyList

  const [categories, setCategories] = useState<string>("");

  useEffect(() => {
    if (selectedGroup) {
      setGroupData({
        id: selectedGroup.id,
        name: selectedGroup.name,
        users: selectedGroup.users || [],
        createdAt: selectedGroup.createdAt,
      });
    }
    // if (selectedGroupId) {
    //     dispatch(fetchGroup(selectedGroupId));
    // }

    if (selectedGroupId && selectedGroup?.users?.length === 0) {
      dispatch(fetchUsersByGroup(selectedGroupId));
    }

    if (selectedGroupId && selectedGroup?.categories?.length === 0) {
      dispatch(fetchCategoriesByGroup(selectedGroupId));
    }
  }, [selectedGroupId]);

  const handleEditGroup = async () => {
    if (groupData) {
      await dispatch(updateGroup(groupData));
      setIsOpenEditGroup(false);
    }
  };

  return (
    <ExpenseContentWrapper className="flex-1 p-6 overflow-y-auto">
      {/* Tên nhóm */}
      <div className="flex gap-2 items-center text-xl font-bold mb-4 dark:text-white">
        <h2>{selectedGroup?.name}</h2>
        <FaRegEdit className="hover:text-blue-600 transition ease-in-out duration-200" />

        <CustomDialog
          open={isOpenEditGroup}
          setOpen={setIsOpenEditGroup}
          dialogTitle="Chỉnh sửa nhóm chi tiêu"
          actionsButton={[
            {
              title: "Lưu thay đổi",
              onClick: handleEditGroup,
            },
          ]}
        >
          <GroupForm
            type="edit"
            groupData={groupData as Group}
            setGroupData={setGroupData}
          />
        </CustomDialog>
      </div>

      {/* Nút thêm chi tiêu */}
      <div className="flex justify-end mb-2">
        <Button size="large" variant="contained" color="primary" onClick={() => setIsOpenCreateGroup(true)}>
          + Thêm chi tiêu
        </Button>
        <CustomDialog
          open={isOpenCreateGroup}
          setOpen={setIsOpenCreateGroup}
          dialogTitle="Tạo chi tiêu"
          actionsButton={[
            {
              title: "Lưu thay đổi",
              onClick: handleEditGroup,
            },
          ]}
        >
          <div className="space-y-4 mt-2">
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium">Ngày</Label>
              <DatePicker value={dayjs()} />
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-1 w-[calc(50%-5px)]">
                <Label className="text-sm font-medium">Danh mục</Label>
                <Select
                  value={categories}
                  setValue={setCategories}
                  options={[
                    { label: "Danh mục 1", value: "1" },
                    { label: "Danh mục 2", value: "2" },
                    { label: "Danh mục 3", value: "3" },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-1 w-[calc(50%-5px)]">
                <Label className="text-sm font-medium">Người chi</Label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <MUISelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </MUISelect>
                </FormControl>
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
                <TbListDetails onClick={() => setIsOpenDetail(true)} className="text-lg hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                <CustomDialog
                maxWidth="md"
                  dialogTitle="Chi tiết hóa đơn ngày 11/02/2025"
                  open={isOpenDetail}
                  setOpen={setIsOpenDetail}
                  actionsButton={[
                    { title: "Lưu", onClick: () => setIsOpenDetail(false) },
                  ]}
                >
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
                        <tr>
                          <td className="px-2 py-2">
                            <Input />
                          </td>
                          <td className="px-2 py-2">
                            <Input />
                          </td>
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
                            <Trash2
                              size={16}
                              className="text-red-500 hover:scale-110 transition ease-in-out duration-200 cursor-pointer"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={6} className="px-2 py-2">
                            <CgAddR className="text-xl hover:text-blue-600 transition ease-in-out duration-200 cursor-pointer" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button type="submit">Lưu</Button>
                </CustomDialog>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Chia sẻ</label>
              <Input />
            </div>
          </div>
        </CustomDialog>
      </div>

      {/* Bảng chi tiêu */}
      <ExpenseList selectedGroupId={selectedGroupId} />
    </ExpenseContentWrapper>
  );
};

const ExpenseContentWrapper = styled.div``;
