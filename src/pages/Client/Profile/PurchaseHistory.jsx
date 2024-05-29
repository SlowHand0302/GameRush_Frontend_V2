import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { Input } from '../../../components/FormBasic';

function PurcaseHistory(props) {
    return (
        <>
            <div className="mb-5">
                <h1 className="text-[30px] font-bold">Lịch sử mua hàng</h1>
                <p>Hiển thị thông tin các sản phẩm bạn đã mua tại Divine Shop</p>
            </div>
            <form
                action=""
                className="flex justify-between gap-10 items-center mb-5 md:flex-wrap md:justify-normal md:gap-[14px] sm:flex-wrap sm:gap-2 2sm:flex-wrap 2sm:gap-2"
            >
                <div className="flex-grow">
                    <label htmlFor="orderId">Mã đơn hàng</label>
                    <Input
                        id={'orderId'}
                        placeholder={'Mã đơn hàng'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="maxPrice">Số tiền từ</label>
                    <Input
                        id={'maxPrice'}
                        placeholder={'Số tiền từ'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="minPrice">Số tiền đến</label>
                    <Input
                        id={`minPrice`}
                        placeholder={'Số tiền đến'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="fromDate">Từ Ngày</label>
                    <Input
                        id={'fromDate'}
                        type={'date'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="toDate">Đến Ngày</label>
                    <Input
                        id={'toDate'}
                        type={'date'}
                        className={'focus:ring-orange-200 focus:ring-2 placeholder-slate-400 rounded-xl'}
                    />
                </div>
                <div className="rounded-xl self-end flex gap-2 items-center cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center text-[12px] font-bold">
                    <CiFilter className="text-[20px]" />
                    Lọc
                </div>
            </form>
            <table className="table-auto w-full ">
                <thead>
                    <tr className=" border border-1 border-gray-200 rounded-t-xl">
                        <th className="p-3 border-gray-200 border-x-1 rounded-tl-xl">Thời gian</th>
                        <th className="p-3 border-gray-200 border-x-1">Mã đơn hàng</th>
                        <th className="p-3 border-gray-200 border-x-1">Sản Phẩm</th>
                        <th className="p-3 border-gray-200 border-x-1">Tổng tiền</th>
                        <th className="p-3 border-gray-200 border-x-1 rounded-tr-xl">Trạng Thái</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </>
    );
}

export default PurcaseHistory;
