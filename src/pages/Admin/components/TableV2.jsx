import { formatCash, splitCamelText } from '../../../utils/helpers';
import { IoIosInformationCircle } from 'react-icons/io';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Badge from '../../../components/Badge';

function TableV2(props) {
    const {
        itemsList = [],
        ignoreAttr = [],
        ignoreChildAttr = [],
        onClickEditBtn,
        onClickDetailBtn,
        onClickRemoveBtn,
    } = props;
    return (
        <div className="max-h-[60vh] rounded-2xl hideScrollbar overflow-scroll lg:max-h-[80vh] md:max-h-[75vh] sm:max-h-[68vh] 2sm:max-h-[80vh]">
            <table className="table-fixed border-collapse w-full h-full lg:w-[1240px] md:w-[991px] sm:w-[768px] 2sm:w-[768px]">
                <thead className="bg-gray-200 rounded-2xl p-4 capitalize sticky top-0">
                    <tr>
                        {Object.keys(itemsList[0]).map((key, index) => {
                            return !ignoreAttr.includes(key) ? (
                                <th className="py-5 " key={index}>
                                    {splitCamelText(key)}
                                </th>
                            ) : null;
                        })}
                        {onClickDetailBtn || onClickEditBtn || onClickRemoveBtn ? <th>Actions</th> : null}
                    </tr>
                </thead>
                <tbody className="overflow-y-scroll hideScrollbar">
                    {itemsList.map((item, index) => {
                        return (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                                {Object.entries(item).map(([key, value], index) => {
                                    if (ignoreAttr.includes(key)) return null;

                                    const lowercaseKey = key.toLowerCase();
                                    let content = null;
                                    if (lowercaseKey === 'image' || lowercaseKey === 'img') {
                                        return (
                                            <td key={index} className="w-auto inline-block max-w-[300px] py-4">
                                                <img src={value} alt="" className="rounded-xl" />
                                            </td>
                                        );
                                    }
                                    if (
                                        lowercaseKey === 'state' ||
                                        lowercaseKey === 'status' ||
                                        typeof value === 'boolean'
                                    ) {
                                        return (
                                            <td key={index} className="flex items-center justify-center h-full">
                                                <Badge state={value}>{value.toString()}</Badge>
                                            </td>
                                        );
                                    }
                                    if (lowercaseKey.includes('price')) {
                                        content = <p className="text-center">{formatCash(value)}</p>;
                                    } else {
                                        content = (
                                            <p
                                                className={`line-clamp-2 m-2 ${
                                                    value.toString().length < 30 && !key.includes('name') ? 'text-center' : 'max-w-[300px]'
                                                }`}
                                            >
                                                {typeof value === 'object'
                                                    ? value.map((item) =>
                                                          Object.entries(item).map(([key, value]) =>
                                                              !ignoreAttr.includes(key) &&
                                                              !ignoreChildAttr.includes(key)
                                                                  ? value + ', '
                                                                  : null,
                                                          ),
                                                      )
                                                    : value}
                                            </p>
                                        );
                                    }

                                    return <td key={index}>{content}</td>;
                                })}
                                <td
                                    className={`${
                                        onClickDetailBtn || onClickEditBtn || onClickRemoveBtn ? '' : 'hidden'
                                    }`}
                                >
                                    <div className="h-[100%] flex items-center justify-center gap-3 px-2">
                                        {onClickDetailBtn && (
                                            <IoIosInformationCircle
                                                className="text-[28px] text-blue-500 cursor-pointer"
                                                onClick={() => onClickDetailBtn(item)}
                                            />
                                        )}
                                        {onClickEditBtn && (
                                            <FaEdit
                                                className="text-[27px] text-yellow-400 cursor-pointer"
                                                onClick={() => onClickEditBtn(item)}
                                            />
                                        )}
                                        {onClickRemoveBtn && <FaTrashAlt className="text-[22px] text-red-300" />}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableV2;
