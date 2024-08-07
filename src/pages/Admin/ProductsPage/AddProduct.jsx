import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import { productAPI, producTypeAPI } from '../../../API';
import validateFormAddProduct from './validateFormAddProduct';
import { Input, Toggle } from '../../../components/FormBasic';
import { formatDate } from '../../../utils/helpers';

function AddProduct(props) {
    const { dataForUpdate = {}, onClose, productType } = props;
    const [productInfor, setProductInfor] = useState({
        productCode: '',
        productTypeId: '',
        expireDate: '',
    });
    const [alertMsg, setAlertMsg] = useState({});
    const location = useLocation();
    const handleOnFormChange = (data) => {
        if (alertMsg[Object.keys(data)]) {
            delete alertMsg[Object.keys(data)];
        }
        setProductInfor({ ...productInfor, ...data });
    };
    const updateProductType = async (id) => {
        try {
            const result = await producTypeAPI.updateProductType({
                ...productType,
                products: [...productType.products, id],
                status: 'available',
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnCreateProduct = async () => {
        const errors = validateFormAddProduct(productInfor);
        if (Object.keys(errors).length !== 0) {
            setAlertMsg(errors);
            return;
        }
        try {
            const result = await productAPI.createProduct(productInfor);
            if (result.success) {
                updateProductType(result.product._id);
                alert('Create new Product success');
            }
        } catch (error) {
            console.log(error);
        }
        onClose();
    };
    const handleOnUpdateProduct = async () => {
        const errors = validateFormAddProduct(productInfor);
        if (Object.keys(errors).length !== 0) {
            setAlertMsg(errors);
            return;
        }
        try {
            const updateState = await productAPI.updateProduct(productInfor);
            if (updateState) alert('Update success');
        } catch (error) {
            console.log(error);
        }
        onClose();
    };
    useEffect(() => {
        handleOnFormChange({ productTypeId: location.pathname.split('/').pop() });
        if (JSON.stringify(dataForUpdate) !== '{}') {
            setProductInfor({ ...dataForUpdate });
        }
    }, []);
    return (
        <div className={'p-4 my-4 bg-white rounded-xl mx-5'}>
            <div className="sticky top-[120px] bg-white z-50">
                <div className="flex gap-5 items-center justify-between">
                    <p className="font-bold text-[25px]">Add New Product</p>
                    <IoMdClose className="text-[30px] cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex-grow">
                        <label htmlFor="expireDate" className="whitespace-nowrap font-bold">
                            Chosen Product Types:
                        </label>
                        <Input
                            type={'text'}
                            id={'productCode'}
                            value={location.pathname.split('/').pop()}
                            className={'rounded-xl text-gray-400 text-opacity-30'}
                            disabled
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="productCode" className="whitespace-nowrap font-bold">
                            Product Code:
                        </label>
                        <Input
                            type={'text'}
                            id={'productCode'}
                            value={productInfor.productCode}
                            className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                alertMsg.productCode ? 'ring-red-500 ring-1' : ''
                            }`}
                            placeholder={'Please input Product Code'}
                            onChange={(event) => handleOnFormChange({ productCode: event.target.value })}
                        />
                        <p className={`text-red-500 text-[14px] italic ${alertMsg.productCode ? 'block' : 'hidden'}`}>
                            {alertMsg?.productCode}
                        </p>
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="expireDate" className="whitespace-nowrap font-bold">
                            Expire Date:
                        </label>
                        <Input
                            type={'date'}
                            id={'expireDate'}
                            className={`focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl ${
                                alertMsg.expireDate ? 'ring-red-500 ring-1' : ''
                            }`}
                            value={
                                JSON.stringify(dataForUpdate) !== '{}'
                                    ? formatDate(productInfor.expireDate, 'yyyy-mm-dd')
                                    : productInfor.expireDate
                            }
                            onChange={(event) => handleOnFormChange({ expireDate: event.target.value })}
                        />
                        <p className={`text-red-500 text-[14px] italic ${alertMsg.expireDate ? 'block' : 'hidden'}`}>
                            {alertMsg?.expireDate}
                        </p>
                    </div>
                    {JSON.stringify(dataForUpdate) !== '{}' && (
                        <Toggle
                            label={'Is Avaialable:'}
                            checked={productInfor['status'] === 'available' ? true : false}
                            onChange={(e) => {
                                setProductInfor({
                                    ...productInfor,
                                    status: e.target.checked ? 'available' : 'unavailable',
                                });
                            }}
                        />
                    )}
                    {JSON.stringify(dataForUpdate) === '{}' ? (
                        <div
                            onClick={handleOnCreateProduct}
                            className="bg-green-500 cursor-pointer flex-grow py-3 px-8 text-center rounded-xl text-white 2sm:px-12"
                        >
                            Add
                        </div>
                    ) : (
                        <div
                            onClick={handleOnUpdateProduct}
                            className="bg-green-500 cursor-pointer flex-grow py-3 px-8 text-center rounded-xl text-white 2sm:px-12"
                        >
                            Update
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
