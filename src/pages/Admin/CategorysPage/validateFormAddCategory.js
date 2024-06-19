const validateFormAddCategory = (categoryInfor) => {
    let typeErrors = {};
    console.log(!categoryInfor.type);
    if (categoryInfor.categoryName === '' || !categoryInfor.categoryName) {
        typeErrors.categoryName = 'Please fill category name';
    }
    if (categoryInfor.type === '' || !categoryInfor.type) {
        typeErrors.type = 'Please select type of category';
    }
    return typeErrors;
};

export default validateFormAddCategory;
