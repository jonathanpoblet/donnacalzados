import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('donna-calzados-carrito')) || [],
  reducers: {
    addToCart: (state, action) => {
      if (state.length === 0) {
        state.push(action.payload);
      } else {
        const index = state.findIndex(s => s.idCartProduct === action.payload.idCartProduct);

        if (index !== -1) {
          state[index].quantity += action.payload.quantity;
        } else {
          state.push(action.payload);
        }
      }

      localStorage.setItem('donna-calzados-carrito', JSON.stringify(state));
      Swal.fire({
        title: 'Calzado Agregado al carrito',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Ir al carrito',
        confirmButtonColor: '#E54787',
        denyButtonColor: '#000000',
        denyButtonText: `Seguir comprando`,
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.setAttribute('data-bs-toggle', 'offcanvas');
          confirmButton.setAttribute('data-bs-target', '#offcanvasExample');
          confirmButton.setAttribute('aria-controls', 'offcanvasExample');

          const bodyElement = document.querySelector('body');
          bodyElement.style = 'overflow: auto'
        },
      });
    },
    restQuantity: (state, action) => {
      const index = state.findIndex(s => s.idCartProduct === action.payload);

      if (state[index].quantity == 1) {
        Swal.fire({
          title: 'Cantidad mínima 1 unidad',
          confirmButtonColor: '#E54787',
        });
      } else {
        state[index].quantity--;
        localStorage.setItem('donna-calzados-carrito', JSON.stringify(state));
      }
    },
    addQuantity: (state, action) => {
      const index = state.findIndex(s => s.idCartProduct === action.payload);

      if (state[index].quantity == 99) {
        Swal.fire({
          title: 'Cantidad máxima 1 unidad',
          confirmButtonColor: '#E54787',
        });
      } else {
        state[index].quantity++;
        localStorage.setItem('donna-calzados-carrito', JSON.stringify(state));
      }
    },
    deleteProduct: (state, action) => {
      const filter = state.filter(s => s.idCartProduct !== action.payload);

      Swal.fire({
        title: 'Producto Eliminado',
        confirmButtonColor: '#E54787',
      });

      localStorage.setItem('donna-calzados-carrito', JSON.stringify(filter));
      return filter;
    },
  },
});

export const { addToCart, restQuantity, addQuantity, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
