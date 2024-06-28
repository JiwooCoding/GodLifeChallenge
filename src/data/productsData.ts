import starbucksImage from '../image/starbucks.png';
import category1 from '../image/전체.png'
import category2 from '../image/식음료.png'
import category3 from '../image/생활.png'
import category4 from '../image/문화.png'



export const categories = [
  {index:1, name:'전체', categoryImage: category1},
  {index:2, name:'식음료', categoryImage: category2},
  {index:3, name:'생활', categoryImage: category3},
  {index:4, name:'문화', categoryImage: category4},

];


const products = [
    {id:1, name: '상품 1', price: 10, category:'식음료', imageUrl:starbucksImage},
    {id:2, name: '상품 2', price: 20, category:'생활',imageUrl:starbucksImage},
    {id:3, name: '상품 3', price: 30, category:'문화',imageUrl:starbucksImage},
    {id:4, name: '상품 4', price: 40, category:'식음료',imageUrl:starbucksImage},
    {id:5, name: '상품 5', price: 10, category:'culture',imageUrl:starbucksImage},
    {id:6, name: '상품 6', price: 20, category:'생활',imageUrl:starbucksImage},
    {id:7, name: '상품 7', price: 30, category:'식음료',imageUrl:starbucksImage},
    {id:8, name: '상품 8', price: 40, category:'문화',imageUrl:starbucksImage}
  ]

  export default products;