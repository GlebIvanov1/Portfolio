import React, { ChangeEvent } from "react";
import styles from './styles.module.scss';

interface EditPageType {
    closeEditMenu: () => void;
    inputRef: any;
    editInputValue: string;
    EditMessageFunction: () => void;
    setEditInputValue: (e: string) => void;
}

const EditPage: React.FC<EditPageType> = ({closeEditMenu, inputRef, editInputValue, EditMessageFunction, setEditInputValue}) => {
    return (
        <>
            <div className={styles.OpenEditWrapper}>
                <div className={styles.InputEditWrapper}>
                    <svg onClick={closeEditMenu} xmlns="http://www.w3.org/2000/svg" className={styles.close} width="30" height="30" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>
                    <h1 className={styles.title}>Edit your message</h1>

                    <input ref={inputRef} type="text" value={editInputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setEditInputValue(e.target.value)} />

                    <button onClick={EditMessageFunction}>Confirm changes</button>
                </div>
            </div>
        </>
    )
};

export default EditPage;