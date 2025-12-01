import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';


export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const q = query(collection(db, 'products'));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
});




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
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.error = null; 
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message; 
    })

  
    .addCase(addNewProduct.pending, (state) => {
      state.addStatus = 'loading';
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