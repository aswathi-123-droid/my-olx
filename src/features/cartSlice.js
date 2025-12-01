import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';




export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue,getState }) => {
    try {
      const user = getState().auth.user
      
      if (!user) return []; 

      const cartRef = collection(db, 'users', user.uid, 'cart');
      const snapshot = await getDocs(cartRef);
      
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (product, { rejectWithValue ,getState}) => {
    try {
      const user = getState().auth.user;
      if (!user) throw new Error("User must be logged in to add to cart");

     
      const itemRef = doc(db, 'users', user.uid, 'cart', product.id);
      await setDoc(itemRef, product);
      
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (productId, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be logged in");

      const itemRef = doc(db, 'users', user.uid, 'cart', productId);
      await deleteDoc(itemRef);

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const {cart} = getState();
      const batch = writeBatch(db);

      
      cart.items.forEach(item => {
        const itemRef = doc(db, 'users', user.uid, 'cart', item.id);
        batch.delete(itemRef);
      });

      await batch.commit();

      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle', 
    error: null
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const exists = state.items.find(i => i.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
      });
  }
});


export default cartSlice.reducer;