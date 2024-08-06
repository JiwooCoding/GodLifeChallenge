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
        <div className='relative z-50'>
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
                <div className='w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2'>
                    <div className='w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2'></div>
                    <ul className='w-40 max-h-[143px] py-1 bg-gray-700 rounded-lg absolute top-0 overflow-auto scrollbar-none'>
                        {checkEqualName(searchTerm).map((e, i) => (
                            <li key={`button-${i}`}>
                                <button 
                                    onClick={() => setSearchTerm(String(e[displayProperty]))}
                                    className='text-base w-full hover:bg-gray-600 p-[2px] text-gray-100'>
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
