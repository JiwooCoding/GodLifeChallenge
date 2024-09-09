import { useState } from 'react'
import ChallengeCategory from './challenge-category/ChallengeCategory'
import ChallengeState from './challenge-state/ChallengeState';
import styles from './ChallengePage.module.scss'
import ChallengeList from './challenge-list/ChallengeList';

const ChallengePage = () => {

    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedState, setSelectedState] = useState('전체');

    const handleCategoryChange = (category:string) => {
        setSelectedCategory(category);
    }

    const handleStateChange = (state:string) => {
        setSelectedState(state);
    }

    return (
        <div className='inner'>
            <h1 className={styles.challenge_text}>지금 바로 챌린지를 시작해보세요 🏃</h1>
            <div className={styles.challenge_filter}>
                <ChallengeCategory
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />
                <ChallengeState
                    selectedState={selectedState}
                    onStateChange={handleStateChange}
                />
            </div>
            <ChallengeList
                category={selectedCategory}
                state={selectedState}
            />
        </div>
    )
}

export default ChallengePage