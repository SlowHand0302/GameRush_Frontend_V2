export function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

export function convertToASCII(str) {
    // Normalize the string and remove diacritics
    let normalizedStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace specific characters
    normalizedStr = normalizedStr.replace(/đ/g, 'd').replace(/Đ/g, 'D');

    // Replace spaces with hyphens and convert to lowercase
    return normalizedStr.toLowerCase().replace(/\s+/g, '-');
}

export function formatCash(numb) {
    const str = numb.toString();
    return (
        str
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            }) + '₫'
    );
}

export function lowercaseFirstLetter(inputString) {
    return inputString.charAt(0).toLowerCase() + inputString.slice(1);
}

export function splitCamelText(text) {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function formatDate(dateTimeString, order) {
    let date = new Date(dateTimeString);
    let day, month, year;
    if (date.toString() === 'Invalid Date') {
        const parts = dateTimeString.split(/[-/]/);
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        year = parseInt(parts[2], 10);
    } else {
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
    }
    let formattedDate = order;
    switch (order.split('').filter((item) => item === 'm').length) {
        case 1:
            formattedDate = formattedDate.replace('m', month.toString());
            break;
        case 2:
            formattedDate = formattedDate.replace('mm', month.toString().padStart(2, '0'));
            break;
        default:
            formattedDate = formattedDate.replace('mm', month.toString().padStart(2, '0'));
            break;
    }
    switch (order.split('').filter((item) => item === 'd').length) {
        case 1:
            formattedDate = formattedDate.replace('d', day.toString());
            break;
        case 2:
            formattedDate = formattedDate.replace('dd', day.toString().padStart(2, '0'));
            break;
        default:
            formattedDate = formattedDate.replace('dd', day.toString().padStart(2, '0'));
            break;
    }
    return formattedDate.replace('yyyy', year);
}

export const formatDateFields = (data) => {
    const fieldsToFormat = ['createdAt', 'updatedAt', 'expireDate']; // Add other date fields as needed
    return data.map((item) => {
        fieldsToFormat.forEach((field) => {
            if (item.hasOwnProperty(field)) {
                item[field] = formatDate(item[field], 'dd/mm/yyyy');
            }
        });
        return item;
    });
};
