import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../type/IProduct";
import api from "../../api/api";


export const postOrder = createAsyncThunk(
    "cart/postOrder",
    async(order:cartState, thunkAPI) => {
        try {
            await api.post('/api/shop/order' ,order);
            thunkAPI.dispatch(sendOrder());
        } catch (error) {
            return thunkAPI.rejectWithValue('카트 에러!!!')
        }
    }
)

type cartState = {
    products:IProduct[];
    totalPrice:number; //총 예상금액 (장바구니에 담긴 모든 상품에 총 가격)
    userId:string;
}

const initialState:cartState = {
    products:localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts') || "") : [],
    totalPrice:0,
    userId: localStorage.getItem('userId') || "",
}

const updateLocalStorageCart = (userId: string, products: IProduct[]) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(products));
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setUserId:(state, action) => {
            state.userId = action.payload;
            const savedCart = localStorage.getItem(`cart_${state.userId}`);
            if(savedCart){
                state.products = JSON.parse(savedCart);
            }
        },
        removeUserId:(state) => {
            localStorage.removeItem(`cart_${state.userId}`);
            state.userId = "";
            state.products = [];
        },
        addToCart: (state, action) => {
            // 이미 장바구니에 있는 상품 찾기
            const existingProduct = state.products.find(item => item.id === action.payload.id);

            if (existingProduct) {
                if (existingProduct.quantity < 10) {
                    if (existingProduct.quantity + 1 <= action.payload.stock) {
                        existingProduct.quantity += 1;
                        existingProduct.total += action.payload.price;
                    } else {
                        alert(`해당 상품은 재고가 ${action.payload.stock}개 남아있어서 추가 구매할 수 없습니다!`);
                    }
                } else {
                    alert('해당 상품은 최대 10개까지만 구매할 수 있습니다!');
                }
            } else {
                // 장바구니에 없는 상품 추가 시
                if (action.payload.stock > 0) {
                    state.products.push({
                        ...action.payload,
                        quantity: 1,
                        total: action.payload.price
                    });
                } else {
                    alert('재고가 부족하여 상품을 추가할 수 없습니다.');
                }
            }

            // 로그인 시 localStorage 업데이트
            if (state.userId) {
                updateLocalStorageCart(state.userId, state.products);
            }
        },
        deleteFromCart:(state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);

            //로그인 시
            if(state.userId){
                updateLocalStorageCart(state.userId, state.products);
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.products));
        },
        decrementProduct:(state, action) => {
            state.products = state.products.map((item) => 
            item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: item.price * (item.quantity - 1)
            }
            : item
        )
            //로그인 시
            if(state.userId){
                updateLocalStorageCart(state.userId, state.products);
            }

            localStorage.setItem('cartProducts',JSON.stringify(state.products));
        },
        incrementProduct:(state, action) => {
            state.products = state.products.map((item) =>
                item.id === action.payload
                ? {
                    ...item,
                    quantity: item.quantity +1,
                    total: item.price * (item.quantity +1)
                }
                : item
            )
            //로그인 시
            if(state.userId){
                updateLocalStorageCart(state.userId, state.products);
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.products));
        },
        getTotalPrice:(state) => {
            state.totalPrice = state.products.reduce((acc, item) => (acc += item.total), 0)
            return state;
        },
        sendOrder:(state) => {
            //빈 객체인 이유?
            //주문하기 버튼 눌러서 주문을 보냈으면 카트에 있는 products들은 비워주어야 하기 때문이다.
            state.products = [];
            if(state.userId){
                updateLocalStorageCart(state.userId, state.products);
            }
        }
    }
})

export const {
    addToCart,
    deleteFromCart,
    incrementProduct,
    decrementProduct,
    getTotalPrice,
    setUserId,
    removeUserId,
    sendOrder
} = cartSlice.actions;

export default cartSlice.reducer;