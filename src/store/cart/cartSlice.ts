import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../type/IProduct";
import api from "../../api/api";


export const postOrder = createAsyncThunk(
    "cart/postOrder",
    async(order:cartState, thunkAPI) => {
        try {
            await api.post('/api/orders' ,order)
            thunkAPI.dispatch(sendOrder());
        } catch (error) {
            return thunkAPI.rejectWithValue('카트 에러!!!')
        }
    }
)

type cartState = {
    products:IProduct[];
    totalPrice:number;
    userId:string;
}

const initialState:cartState = {
    products:localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts') || "") : [],
    totalPrice:0,
    userId:localStorage.getItem('user_id') ? JSON.parse(localStorage.getItem('user_id') || "") : ""
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setUserId:(state, action) => {
            state.userId = action.payload;
            localStorage.setItem('userId', JSON.stringify(state.userId));
        },
        removeUserId:(state, action) => {
            state.userId = "";
            localStorage.setItem('userId', JSON.stringify(state.userId));
        },
        addToCart:(state, action) => {
            state.products.push({
                ...action.payload,
                quantity:1,
                total: action.payload.price
            })
            localStorage.setItem('cartProducts', JSON.stringify(state.products));
        },
        deleteFromCart:(state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)

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
            localStorage.setItem("cartProducts", JSON.stringify(state.products));
        },
        getTotalPrice:(state) => {
            state.totalPrice = state.products.reduce((acc, item) => (acc += item.total), 0)
            return state;
        },
        sendOrder:(state) => {
            //빈 객체인 이유?
            //주문하기 버튼 눌러서 주문을 보냈으면 카트에 있는 products들은 비워주어야 하기 때문이다.
            state.products = [],
            localStorage.setItem("cartProducts", JSON.stringify(state.products))
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