import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './Tabs.module.css';

const List = ({ items, removeItem, editItem }) => {
    return (
    <div className='list'>
    {items.map((item) => {
        const { id, title } = item;
        return (
        <article className={styles.item} key={id}>
            <p className={styles.title}>{title}</p>
            <div className={styles.container}>
                <FaEdit
                type='button'
                className={styles.edit}
                onClick={() => editItem(id)}>
                </FaEdit>
            <FaTrash             
            type='button'
            className={styles.delete}
            onClick={() => removeItem(id)}></FaTrash>
            </div>
        </article>
        );
    })}
    </div>
);
};

export default List;