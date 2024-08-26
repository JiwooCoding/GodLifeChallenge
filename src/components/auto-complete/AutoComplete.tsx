import React, { useState } from 'react';
import styles from './AutoComplete.module.scss';
import searchImage from '../../image/free-icon-magnifier-2319177.png';

interface AutoCompleteProps<T> {
    items: T[];
    setFilteredItems: (items: T[]) => void;
    displayProperty: keyof T;  // 검색에 사용할 프로퍼티 이름
}

const AutoComplete = <T extends {}>({ items, setFilteredItems, displayProperty }: AutoCompleteProps<T>) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filterItems = (input: string) => {
        const value = input.toLowerCase();
        return value ? items.filter(e => String(e[displayProperty]).toLowerCase().includes(value)) : [];
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let text = searchTerm.trim();
        const filteredItems = filterItems(text);
        setFilteredItems(filteredItems.length > 0 ? filteredItems : items);
    };

    const checkEqualName = (input: string) => {
        const filteredArray = filterItems(input);
        return filteredArray[0]?.[displayProperty] === input ? [] : filteredArray;
    };

    return (
        <div className={styles.autoComplete}>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${styles.inputbox} ${styles.active}`}
                    placeholder='검색어 입력'
                />
                <button type='submit' className={styles.searchTerm}>
                    <img src={searchImage} alt='search_image'/>
                </button>
            </form>
            {checkEqualName(searchTerm).length > 0 && (
                <div className={styles.researchContainer}>
                    <ul className={styles.result}>
                        {checkEqualName(searchTerm).map((e, i) => (
                            <li key={`button-${i}`}>
                                <button 
                                    onClick={() => setSearchTerm(String(e[displayProperty]))}
                                    className={styles.resultItem}>
                                    {String(e[displayProperty])}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AutoComplete;
