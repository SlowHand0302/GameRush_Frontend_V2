const validateFormAddType = (typeInfor) => {
    let typeErrors = {};
    if (typeInfor.name === '') {
        typeErrors.name = 'Please fill name of type';
    }
    if (typeInfor.businessType === '') {
        typeErrors.businessType = 'Please choose bussiness type';
    }
    if (typeInfor.useTime === '') {
        typeErrors.useTime = 'Please choose the use time of type';
    }
    if (typeInfor.categories.length <= 1) {
        typeErrors.categories = 'Please choose at least 1 category';
    }
    if (typeInfor.sellPrice === 0) {
        typeErrors.sellPrice = 'Please fill sell price of type';
    }
    if (typeInfor.originalPrice === 0) {
        typeErrors.originalPrice = 'Please fill original price of type';
    }
    return typeErrors;
};

export default validateFormAddType;
