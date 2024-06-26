import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { categoryAPI } from '../../../API';
import { Select, Input, Toggle } from '../../../components/FormBasic';
import validateFormAddCategory from './validateFormAddCategory';

function AddCategory(props) {
    const { onClose, onAdd, onUpdate, dataForUpdate = {} } = props;
    const categoryTypes = [
        { name: 'App', value: 'app' },
        { name: 'Chức năng', value: 'function' },
        { name: 'Game', value: 'game' },
        { name: 'Dịch vụ', value: 'service' },
    ];
    const [alertMsg, setAlertMsg] = useState({});
    const [categoryInfor, setCategoryInfor] = useState(dataForUpdate);
    const handleOnFormChange = (data) => {
        if (alertMsg[Object.keys(data)]) {
            delete alertMsg[Object.keys(data)];
        }
        setCategoryInfor({ ...categoryInfor, ...data });
    };
    const handleCreateCategory = async () => {
        const errors = validateFormAddCategory(categoryInfor);
        if (Object.keys(errors).length !== 0) {
            setAlertMsg(errors);
            return;
        }
        try {
            const createState = await categoryAPI.createCategory(categoryInfor);
            if (createState) {
                toast.success('Create New Category Success');
            } else {
                toast.error('Create New Category Fail');
            }
        } catch (error) {
            console.log(error);
        }
        onClose();
        onAdd();
    };
    const handleUpdateCategory = async () => {
        const errors = validateFormAddCategory(categoryInfor);
        if (Object.keys(errors).length !== 0) {
            setAlertMsg(errors);
            return;
        }
        try {
            const updateState = await categoryAPI.updateCategory(categoryInfor);
            if (updateState) {
                toast.success('Update category success');
            } else {
                toast.error('Update category success');
            }
        } catch (error) {
            console.log(error);
            toast.error('Update category success');
        }
        onUpdate();
        onClose();
    };
    return (
        <div className="bg-white w-[50%] p-5 rounded-2xl">
            <h1 className="font-bold text-[25px] flex justify-between">
                Add New Category{' '}
                <span className="cursor-pointer" onClick={onClose}>
                    <IoCloseSharp />
                </span>
            </h1>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="font-bold" htmlFor="categoryName">
                        Category Name:{' '}
                    </label>
                    <Input
                        id={'categoryName'}
                        type={'text'}
                        className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                            alertMsg.categoryName ? 'ring-red-500 ring-1' : ''
                        }`}
                        placeholder={'Please input category name'}
                        value={categoryInfor.categoryName || ''}
                        onChange={(event) => handleOnFormChange({ categoryName: event.target.value })}
                    />
                    <p className={`text-red-500 text-[14px] italic ${alertMsg.categoryName ? 'block' : 'hidden'}`}>
                        {alertMsg?.categoryName}
                    </p>
                </div>
                <div>
                    <label className="font-bold" htmlFor="categoryName">
                        Category Type:{' '}
                    </label>
                    <Select
                        className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                            alertMsg.type ? 'ring-red-500 ring-1' : ''
                        }`}
                        options={categoryTypes}
                        value={categoryInfor.type || ''}
                        onChange={(event) => handleOnFormChange({ type: event.target.value })}
                    />
                    <p className={`text-red-500 text-[14px] italic ${alertMsg.type ? 'block' : 'hidden'}`}>
                        {alertMsg?.type}
                    </p>
                </div>
                <div>
                    {Object.keys(dataForUpdate).length === 0 ? (
                        <div
                            className="bg-green-500 py-3 px-8 text-center cursor-pointer rounded-xl text-white 2sm:px-12"
                            onClick={handleCreateCategory}
                        >
                            Add
                        </div>
                    ) : (
                        <>
                            <Toggle
                                label={'Active: '}
                                checked={categoryInfor.state === 'active' ? true : false}
                                onChange={(state) => {
                                    setCategoryInfor({
                                        ...categoryInfor,
                                        state: `${!state ? 'inactive' : 'active'}`,
                                    });
                                }}
                            />
                            <div
                                className="bg-green-500 mt-3 py-3 px-8 text-center cursor-pointer rounded-xl text-white 2sm:px-12"
                                onClick={handleUpdateCategory}
                            >
                                Update
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddCategory;
