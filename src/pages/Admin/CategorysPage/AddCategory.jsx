import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminCategoryAPI } from '../../../API';
import { Select, Input, Toggle } from '../../../components/FormBasic';

function AddCategory(props) {
    const { onClose, onAdd, onUpdate, dataForUpdate = {} } = props;
    const categoryTypes = [
        { name: 'App', value: 'app' },
        { name: 'Chức năng', value: 'function' },
        { name: 'Game', value: 'game' },
    ];
    const [categoryInfor, setCategoryInfor] = useState(dataForUpdate);
    const handleOnFormChange = (data) => {
        setCategoryInfor({ ...categoryInfor, ...data });
    };
    const handleCreateCategory = async () => {
        try {
            const createState = await AdminCategoryAPI.createCategory(categoryInfor);
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
        try {
            const updateState = await AdminCategoryAPI.updateCategory(categoryInfor);
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
                        placeholder={'Please input category name'}
                        value={categoryInfor.categoryName || ''}
                        onChange={(event) => handleOnFormChange({ categoryName: event.target.value })}
                        // disabled={Object.keys(dataForUpdate).length !== 0}
                    />
                </div>
                <div>
                    <label className="font-bold" htmlFor="categoryName">
                        Category Type:{' '}
                    </label>
                    <Select
                        options={categoryTypes}
                        value={categoryInfor.type}
                        onChange={(event) => handleOnFormChange({ type: event.target.value })}
                    />
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
