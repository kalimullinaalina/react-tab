import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from './Tabs.module.css';
import List from './List'

import {slugify} from "../../utils/slugify";


const Tabs = ({ children, initialTab }) => {
    const [activeTab,  setActiveTab] = useState(children[0].props.label);
    const router = useRouter();

    const [name, setName] = useState('');
    const [list, setList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault()
        setActiveTab(slugify(newActiveTab))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && isEditing){
            //deal with edit
            setList(
                list.map((item) => {
                if (item.id === editID) {
                    return { ...item, title: name };
                }
                return item;
                })
            );
            setName('');
            setEditID(null);
            setIsEditing(false);
        } else {
            //show aliert
            const newItem = {id: new Date().getTime().toString(), title:name};
            setList([...list, newItem]); 
            setName(''); 
        }
    }

    useEffect(() => {
        if(initialTab.tab){
            setActiveTab(initialTab.tab);
            console.log(initialTab);
        }
    }, [])

    useEffect(() => {
        router.push(`${router.pathname}?tab=${slugify(activeTab)}`, undefined, { shallow: true })
    }, [activeTab])

    const removeItem = (id) => {
        setList(list.filter((item) => item.id !== id));
    }
    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(specificItem.title);
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list])

    return (
        <section className={styles.section}>
            <form className='form' onSubmit={handleSubmit}>
            <div className={styles.form}>
                <input 
                type="text" 
                className={styles.list} 
                placeholder='ААА 001 716' 
                value={name}
                onChange={(e) =>setName(e.target.value)}></input>
                <button 
                type="submit"
                className={styles.btn}>
                    {isEditing ? 'edit' : 'submit'}
                </button>
            </div>
            </form>
        <div>
            <ul className={styles.tabs}>
                {children.map((tab) => {
                    const label = tab.props.label;
                return (
                <li 
                className={slugify(label) == activeTab ? styles.current : ""}
                key={label}
                >
                <a href="#" onClick={e => handleClick(e, label)}>{label}</a>
                </li>
                )
                })}
            </ul>
                <div className={styles.container}>
                    <List 
                    items={list} 
                    removeItem={removeItem}
                    editItem={editItem}
                    ></List>
                </div>
                {children.map((one) => {
                    if(slugify(one.props.label) == activeTab)
                    return (
                        <div key={one.props.label} className={styles.content}>{one.props.children}</div>
                    );
                })}
        </div>
        </section>
    );
};

export { Tabs };