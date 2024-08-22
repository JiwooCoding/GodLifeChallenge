import { categories } from '../../../data/productsData';
import styles from './ProductCategory.module.scss';

interface ProductCategoryProps {
  onCategoryChange: (category: string, index: number) => void;
  activeButtonIndex: number;
}

const ProductCategory = ({ onCategoryChange, activeButtonIndex }: ProductCategoryProps) => {
  return (
    <div className={styles.category}>
      {categories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name, index)}
          className={`${styles.category_button_wrapper} ${activeButtonIndex === index ? styles.active : ''}`}
        >
          <div className={styles.hover}>
            <div className={`${styles.category_button} ${activeButtonIndex === index ? styles.active : ''}`}>
              <img src={category.categoryImage} alt={category.name} style={{ width: '50px', height: 'auto' }} />
            </div>
            <p className={styles.category_name}>{category.name}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ProductCategory;
