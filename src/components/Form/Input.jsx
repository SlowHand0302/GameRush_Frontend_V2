import clsx from 'clsx';
import { useRef, useState } from 'react';

import useDocumentClick from '../../hooks/useDocumentClick';

import styles from './Input.module.scss';

function Input(props) {
    const { id, type, label, placeHolder = null, alertMsg = null, value, onChange, customClass } = props;
    const inputRef = useRef(null);
    const clickedElement = useDocumentClick();
    const handleOnChange = (event) => {
        if (typeof onChange === 'function') {
            onChange({ [id]: event.target.value });
        }
    };
    return (
        <div className={clsx(styles.wrapper, customClass)}>
            <div className={clsx(styles.container)}>
                <input
                    id={id}
                    className={clsx(styles.inputText, { [styles.notEmpty]: value })}
                    type={type}
                    value={value === 0 ? '' : value}
                    onChange={(event) => handleOnChange(event)}
                    ref={inputRef}
                    step={10000}
                    required
                />
                <label className={clsx(styles.label)} htmlFor={id}>
                    {clickedElement === inputRef.current || value ? label : placeHolder}
                </label>
            </div>
            {alertMsg && <p className={clsx(styles.alertMsg, { [styles.active]: alertMsg })}>{alertMsg}</p>}
        </div>
    );
}

export default Input;
