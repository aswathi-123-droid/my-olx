import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { clearCartAsync } from './cartSlice';
import { fetchProducts } from './productSlice';

export const processCheckout = createAsyncThunk(
  'checkout/process',
  async (cartItems, { dispatch, rejectWithValue }) => {
    try {
      const batch = writeBatch(db);
      cartItems.forEach((item) => {
        const itemRef = doc(db, 'products', item.id);
        batch.update(itemRef, { sold: true });
      });
      
      await batch.commit();

      dispatch(clearCartAsync());      
      dispatch(fetchProducts());   
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: { status: 'idle' },
  reducers: {
    resetCheckout: (state) => { state.status = 'idle'; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processCheckout.pending, (state) => { state.status = 'loading'; })
      .addCase(processCheckout.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(processCheckout.rejected, (state) => { state.status = 'failed'; });
  }
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;