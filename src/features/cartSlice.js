import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

// --- ASYNC THUNKS ---

// 1. Fetch Cart from Firebase
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue,getState }) => {
    try {
      const user = getState().auth.user
      
      if (!user) return []; // If no user, return empty cart

      const cartRef = collection(db, 'users', user.uid, 'cart');
      const snapshot = await getDocs(cartRef);
      
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Add Item to Firebase Cart
export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (product, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be logged in to add to cart");

      // Use product ID as document ID to prevent duplicates
      const itemRef = doc(db, 'users', user.uid, 'cart', product.id);
      // Save product to 'cart' subcollection
      await setDoc(itemRef, product);
      
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. Remove Item from Firebase Cart
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

// 4. Clear Cart (e.g., after checkout)
export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const {cart} = getState();
      const batch = writeBatch(db);

      // Loop through current items and delete them
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
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCartItems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // Only push if it's not already there (Redux state update)
        const exists = state.items.find(i => i.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      // Remove
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      // Clear
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
      });
  }
});

export const { resetCartLocal } = cartSlice.actions;
export default cartSlice.reducer;