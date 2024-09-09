import styles from './ChallengeCategory.module.scss'

interface ChallengeCategoryProps{
    selectedCategory:string;
    onCategoryChange:(category:string) => void;
}

const ChallengeCategory = ({selectedCategory, onCategoryChange}:ChallengeCategoryProps) => {
    const categories = ['전체','규칙적인생활','운동','셀프케어','식습관'];
    return (
        <div>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={selectedCategory === category ? `${styles.categoryButton} ${styles.onclick}` : `${styles.categoryButton}`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default ChallengeCategory