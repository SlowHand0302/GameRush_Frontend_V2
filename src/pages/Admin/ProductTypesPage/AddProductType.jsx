import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from 'react-icons/io';

import { AdminProducTypeAPI, AdminCategoryAPI } from '../../../API';
import { Input, UploadBox, Select, Toggle, SearchBar, Editor } from '../../../components/FormBasic';
import Badge from '../../../components/Badge';
import * as productTypeConstants from '../constants';

function AddProductType(props) {
    const location = useLocation();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [productTypeInfor, setProductTypeInfor] = useState({
        name: '',
        description: '',
        originalPrice: 0,
        sellPrice: 0,
        isHot: false,
        status: 'available',
        categories: [],
        businessType: '',
        useTime: '',
    });
    const clearForm = () => {
        setProductTypeInfor({
            name: '',
            description: '',
            originalPrice: 0,
            sellPrice: 0,
            isHot: false,
            status: 'available',
            categories: [],
            businessType: '',
            useTime: '',
        });
    };
    const fetchData = async (query) => {
        try {
            const productTypeData = await AdminProducTypeAPI.getProductTypesByFilter(query);
            setProductTypeInfor(productTypeData[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnFormChange = (data) => {
        setProductTypeInfor({ ...productTypeInfor, ...data });
    };
    const handleOnCreateType = async () => {
        try {
            const createState = await AdminProducTypeAPI.createProductType(productTypeInfor);
            if (createState) {
                toast.success('Create new Type success');
            } else {
                toast.error('Create new Type fail');
            }
        } catch (error) {
            toast.error(error);
        }
        clearForm();
    };
    const handleOnUpdateType = async () => {
        try {
            const updateState = await AdminProducTypeAPI.updateProductType(productTypeInfor);
            if (updateState) {
                toast.success('Update Type success');
            } else {
                toast.error('Create new Type fail');
            }
        } catch (error) {
            toast.error(error);
        }
        fetchData({ _id: location.pathname.split('/').pop() });
    };
    useEffect(() => {
        // Editor must loaded completely before starting fetching data
        if (!location.pathname.includes('create')) {
            fetchData({ _id: location.pathname.split('/').pop() });
        }
        return () => {
            setEditorLoaded(!editorLoaded);
        };
    }, [editorLoaded]);
    useEffect(() => {
        // firstly, must load editor complete to load fetched data to editor
        setEditorLoaded(!editorLoaded);
    }, []);
    useEffect(() => {
        // must clear the data in editor first then clear the data in other
        if (productTypeInfor.description === '' && location.pathname.includes('create')) {
            clearForm();
        }
    }, [productTypeInfor.description]);
    console.log(productTypeInfor);
    return (
        <div className={'p-4 my-4 bg-white rounded-xl mx-5'}>
            <div className="flex gap-5 items-center">
                <Link to={'/admin/productType'}>
                    <IoIosArrowBack className="text-[30px] cursor-pointer" />
                </Link>
                <p className="font-bold text-[25px]">Add New Product Type</p>
            </div>
            <form className="flex flex-col gap-3">
                <div>
                    <label htmlFor="name" className="font-bold">
                        Product Type Name
                    </label>
                    <Input
                        id={'name'}
                        type={'text'}
                        value={productTypeInfor.name}
                        onChange={(event) => handleOnFormChange({ name: event.target.value })}
                    />
                </div>
                <div className="flex gap-5 md:flex-col sm:flex-col 2sm:flex-col">
                    <div className="flex-grow">
                        <label htmlFor="" className="font-bold">
                            Business Type
                        </label>
                        <Select
                            options={productTypeConstants.businessTypes}
                            value={productTypeInfor.businessType}
                            onChange={(event) => handleOnFormChange({ businessType: event.target.value })}
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="" className="font-bold">
                            Use Time{' '}
                        </label>
                        <Select
                            options={productTypeConstants.useTimes}
                            value={productTypeInfor.useTime}
                            onChange={(event) => handleOnFormChange({ useTime: event.target.value })}
                        />
                    </div>
                </div>
                <div className="flex items-center flex-wrap justify-between">
                    <label htmlFor="category" className="font-bold whitespace-nowrap">
                        Choose Category:{' '}
                    </label>
                    <SearchBar
                        className={'w-[75%] sm:w-full 2sm:w-full'}
                        placeholder={'Search Category'}
                        name={'categoryName'}
                        onSearch={AdminCategoryAPI.getSearch}
                        onSelect={(result) => {
                            let isDuplicate =
                                productTypeInfor.categories.filter(
                                    (item) => JSON.stringify(item) === JSON.stringify(result),
                                ).length === 0;
                            if (isDuplicate)
                                handleOnFormChange({ categories: [...productTypeInfor.categories, result] });
                        }}
                    />
                </div>
                {productTypeInfor.categories.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {productTypeInfor.categories.map((item, index) => {
                            return (
                                <Badge
                                    key={index}
                                    state={'hashTag'}
                                    onClick={() =>
                                        handleOnFormChange({
                                            categories: productTypeInfor.categories.filter(
                                                (category) => JSON.stringify(category) !== JSON.stringify(item),
                                            ),
                                        })
                                    }
                                >
                                    {item.categoryName}
                                </Badge>
                            );
                        })}
                    </div>
                )}
                <div className="flex gap-5 md:flex-col sm:flex-col 2sm:flex-col">
                    <div className="flex-grow">
                        <label htmlFor="originalPrice" className="font-bold">
                            Original Price{' '}
                        </label>
                        <Input
                            id={'originalPrice'}
                            type={'number'}
                            step={10000}
                            placeholder={productTypeInfor.originalPrice}
                            value={productTypeInfor.originalPrice === 0 ? '' : productTypeInfor.originalPrice}
                            min={0}
                            onChange={(event) => handleOnFormChange({ originalPrice: event.target.value })}
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="sellPrice" className="font-bold">
                            Sell Price{' '}
                        </label>
                        <Input
                            id={'sellPrice'}
                            type={'number'}
                            step={10000}
                            min={0}
                            placeholder={productTypeInfor.sellPrice}
                            value={productTypeInfor.sellPrice === 0 ? '' : productTypeInfor.sellPrice}
                            onChange={(event) => handleOnFormChange({ sellPrice: event.target.value })}
                        />
                    </div>
                </div>
                <div className="flex gap-8 md:flex-col sm:flex-col 2sm:flex-col">
                    {!location.pathname.includes('create') && (
                        <Toggle
                            label={'Is Avaialable:'}
                            checked={productTypeInfor['status'] === 'available' ? true : false}
                            onChange={(e) => {
                                setProductTypeInfor({
                                    ...productTypeInfor,
                                    status: e.target.checked ? 'available' : 'unavailable',
                                });
                            }}
                        />
                    )}
                    <Toggle
                        label={'Is Hot:'}
                        checked={productTypeInfor['isHot']}
                        onChange={(e) => {
                            setProductTypeInfor({ ...productTypeInfor, isHot: e.target.checked });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="" className="font-bold">
                        Image{' '}
                    </label>
                    <UploadBox tag={'file'} data={productTypeInfor} setData={setProductTypeInfor} />
                </div>
                <div className="relative">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <Editor
                        editorLoaded={editorLoaded}
                        data={productTypeInfor.description}
                        setData={(data) => handleOnFormChange({ description: data })}
                    />
                </div>
                {!location.pathname.includes('create') ? (
                    <div
                        onClick={handleOnUpdateType}
                        className="bg-green-500 cursor-pointer py-3 px-8 text-center rounded-xl text-white 2sm:px-12"
                    >
                        Update
                    </div>
                ) : (
                    <div
                        onClick={handleOnCreateType}
                        className="bg-green-500 cursor-pointer py-3 px-8 text-center rounded-xl text-white 2sm:px-12"
                    >
                        Add
                    </div>
                )}
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddProductType;
