import { createSlice } from '@reduxjs/toolkit';
import { getRequest } from '../../services/httpRequests';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    detail: {},
    homeProducts: [],
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setHomeProducts: (state, action) => {
      state.homeProducts = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts, setHomeProducts, setLoading, setDetail } = productsSlice.actions;

export default productsSlice.reducer;

export const getAllProducts = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const { products } = await getRequest('/api/products');
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const getHomeProducts = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const { products } = await getRequest('/api/products/homeProducts');
    dispatch(setHomeProducts(products));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const getProductById = id => async dispatch => {
  try {
    dispatch(setLoading(true));
    const { product } = await getRequest('/api/products/' + id);
    dispatch(setDetail(product));
  } catch (error) {
    dispatch(setLoading(false));
  }
};
