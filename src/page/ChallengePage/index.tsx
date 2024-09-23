import { useState } from 'react'
import ChallengeCategory from './challenge-category/ChallengeCategory'
import styles from './ChallengePage.module.scss'
import ChallengeList from './challenge-list/ChallengeList';
import SelectOption from '../../components/selectOption/SelectOption';

const ChallengePage = () => {

    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedStatus, setSelectedStatus] = useState('전체');

    const handleCategoryChange = (category:string) => {
        setSelectedCategory(category);
    }

    const handleStateChange = (state:string) => {
        setSelectedStatus(state);
    }

    return (
        <div className='inner'>
            <h1 className={styles.challenge_text}>지금 바로 챌린지를 시작해보세요 🏃</h1>
            <div className={styles.challenge_filter}>
                <ChallengeCategory
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />
                <SelectOption
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStateChange}
                />
            </div>
            <ChallengeList
                category={selectedCategory}
                state={selectedStatus}
            />
        </div>
    )
}

export default ChallengePage