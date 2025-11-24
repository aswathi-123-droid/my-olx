import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Fetch only UNSOLD products
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const q = query(collection(db, 'products'), where("sold", "==", false));
  const querySnapshot = await getDocs(q);
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
});

// Add a new product
export const addNewProduct = createAsyncThunk('products/add', async (productData) => {
  const docRef = await addDoc(collection(db, 'products'), {
    ...productData,
    sold: false,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, ...productData, sold: false };
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle',addStatus: 'idle', error: null },
  reducers: {},
 extraReducers: (builder) => {
  builder
    // --- FETCHING ---
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message; // Capture the error message
    })

    // --- ADDING ---
    .addCase(addNewProduct.pending, (state) => {
      state.addStatus = 'loading'; // Use a separate status for adding!
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.addStatus = 'succeeded';
      state.items.push(action.payload);
    })
    .addCase(addNewProduct.rejected, (state, action) => {
      state.addStatus = 'failed';
      state.error = action.error.message;
    });
}
});

export default productSlice.reducer;