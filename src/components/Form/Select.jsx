import clsx from 'clsx';
import { useRef } from 'react';

import styles from './Select.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useDocumentClick from '../../hooks/useDocumentClick';

function Select(props) {
    const { id, label, placeHolder, selectValues, value, onSelect, customClass } = props;
    const inputRef = useRef(null);
    const clickedElement = useDocumentClick();

    const handleOnSelectItem = (item) => {
        onSelect({ ...item });
    };

    return (
        <div className={clsx(styles.wrapper, customClass)}>
            <div className={clsx(styles.formField)}>
                <input
                    id={id}
                    type="text"
                    className={clsx(styles.inputText, {
                        [styles.notEmpty]: value,
                    })}
                    value={value}
                    ref={inputRef}
                    required
                    readOnly
                />
                <label className={clsx(styles.label)} htmlFor={id}>
                    {clickedElement === inputRef.current || value ? label : placeHolder}
                </label>
                {clickedElement === inputRef.current ? (
                    <IoIosArrowDown className={clsx(styles.icon)} />
                ) : (
                    <IoIosArrowUp className={clsx(styles.icon)} />
                )}
            </div>
            <ul
                className={clsx(styles.dropDownList, {
                    [styles.active]: clickedElement === inputRef.current && clickedElement !== null,
                })}
            >
                {selectValues.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => handleOnSelectItem({ [Object.keys(item)]: Object.values(item)[0] })}
                        >
                            {Object.keys(item)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Select;
