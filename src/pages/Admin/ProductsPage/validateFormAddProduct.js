const validateFormAddProduct = (productInfor) => {
    let typeErrors = {};
    if (productInfor.productCode === '') {
        typeErrors.productCode = 'Please fill product code';
    }
    if (productInfor.expireDate === '') {
        typeErrors.expireDate = 'Please choose expire date';
    }
    return typeErrors;
};

export default validateFormAddProduct;
