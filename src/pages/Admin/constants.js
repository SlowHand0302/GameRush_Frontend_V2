export const businessTypes = [
    { name: 'Extend', value: 'extend' },
    { name: 'Account', value: 'account' },
    { name: 'Upgrade', value: 'upgrade' },
];

export const useTimes = [
    { name: '1 Ngày', value: '1 Ngày' },
    { name: '5 Ngày', value: '5 Ngày' },
    { name: '7 Ngày', value: '7 Ngày' },
    { name: '15 Ngày', value: '15 Ngày' },
    { name: '1 Tháng', value: '1 Tháng' },
    { name: '2 Tháng', value: '2 Tháng' },
    { name: '3 Tháng', value: '3 Tháng' },
    { name: '4 Tháng', value: '4 Tháng' },
    { name: '6 Tháng', value: '6 Tháng' },
    { name: '1 Năm', value: '1 Năm' },
    { name: '2 Năm', value: '2 Năm' },
    { name: '3 Năm', value: '3 Năm' },
    { name: 'Vĩnh viễn', value: 'Vĩnh viễn' },
];

export const sortCategoryItems = [
    { Newest: '-updatedAt' },
    { Oldest: 'updatedAt' },
    { Ascending: 'categoryName' },
    { Descending: '-categoryName' },
];

export const sortProductTypeItems = [
    { Newest: '-updatedAt' },
    { Oldest: 'updatedAt' },
    { Costliest: '-sellPrice' },
    { Cheapest: 'sellPrice' },
    { Ascending: '-name' },
    { Descending: 'name' },
];

export const sortProductItems = [
    { Costliest: '-sellPrice' },
    { Cheapest: 'sellPrice' },
    { Ascending: '-name' },
    { Descending: 'name' },
];
