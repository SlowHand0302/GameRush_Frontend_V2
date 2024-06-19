const validateFormInfor = (userInfor) => {
    let typeErrors = {};
    if (userInfor.name === '') {
        typeErrors.name = 'Họ và tên là thông tin bắt buộc';
    }
    if (userInfor.phoneNumb === '') {
        typeErrors.phoneNumb = 'Số điện thoại là thông tin bắt buộc';
    } else if (!/^[0]\d{9}$/.test(userInfor.phoneNumb)) {
        typeErrors.phoneNumb = 'Không đúng định dạng của số điện thoại';
    }
    if (userInfor.email === '') {
        typeErrors.email = 'Email là thông tin bắt buộc';
    } else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userInfor.email)) {
        typeErrors.email = 'Không đúng định dạng của email';
    }
    if (userInfor.password === '') {
        typeErrors.password = 'Họ và tên là thông tin bắt buộc';
    }
    return typeErrors;
};

export default validateFormInfor;
