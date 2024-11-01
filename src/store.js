// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        Veg: [
            { name: 'Tomato', price: 200.5 },
            { name: 'Potato', price: 100.8 }
        ],
        NonVeg: [
            { name: 'Chicken', price: 150.5 },
            { name: 'Mutton', price: 200.5 }
        ],
    },
    reducers: {} // empty for now since there are no reducers
});


const cartSlice = createSlice({
    name : 'cart',
    initialState : [],
    reducers:{
        addToCart : (state,action) => {
            const status = state.find(item => item.name==action.payload.name)
            if(status)
            {
                status.quantity += 1;
            }
            else
            {
                state.push({...action.payload,quantity:1})
            }
        },

        increment : (state,action) => {
            const item = state.find(item => item.name === action.payload.name)
            if( item && item.quantity > 0 )
            {
                {item.quantity +=1}
            }
            
        },
        decrement : (state,action) => {
            const item = state.find(item => item.name === action.payload.name)
            if(item && item.quantity > 1)
            {
                {item.quantity -=1}
            }
            else{
                return state.filter(item => item.name !=action.payload.name)
            }
        },
        removeItem : (state,action) => {
            const item = state.find(item => item.name !== action.payload.name)
            if(item)
            {
              return  state.filter(item => item.name !=action.payload.name);
            }
        }
    }
}
)
const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer
    }
});

export const {addToCart,increment,decrement,removeItem} = cartSlice.actions;
export default store;
