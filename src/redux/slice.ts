import { createSlice } from '@reduxjs/toolkit';
import { IOrder, IProduct } from 'src/models';
// import { Firebase } from '../firebase';
// import { IDate } from '../model';
import { AppDispatch } from './store';

export interface BasketState {
  order: IOrder;
  isLoading: boolean;
}

const initialState: BasketState =
  typeof localStorage !== 'undefined' && localStorage.getItem('basket')
    ? JSON.parse(localStorage.getItem('basket')!)
    : {
        order: {
          price: 0,
          count: 0,
          create_time: 0,
          items: [],
        },
        isLoading: false,
      };

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action) {
      let isAdded = state.order.items.find((e) => e.id === action.payload.id);

      if (isAdded) {
        state.order.items = state.order.items.map((e) => {
          if (e.id === action.payload.id)
            return {
              ...e,
              count: e.count ? e.count + action.payload.count : 2,
            };
          return e;
        });
      } else {
        state.order.items = [...state.order.items, action.payload];
      }
    },
    removeItem(state, action) {
      state.order.items = state.order.items.filter(
        (e) => e.id !== action.payload.id
      );
    },
    plusItem(state, action) {
      state.order.items = state.order.items.map((e) => {
        if (e.id === action.payload) {
          return { ...e, count: e.count ? ++e.count : 1 };
        }
        return e;
      });
    },
    minusItem(state, action) {
      state.order.items = state.order.items.map((e) => {
        if (e.id === action.payload) {
          return { ...e, count: e.count ? --e.count : 1 };
        }
        return e;
      });
    },
    updateCount(state) {
      state.order.count = state.order.items.reduce((acc, e) => {
        acc += e.count ?? 1;
        return acc;
      }, 0);
    },
    updatePrice(state) {
      state.order.price = state.order.items.reduce((acc, e) => {
        acc += e.count ? e.count * e.price : e.price;
        return acc;
      }, 0);
    },
    updateStorage(state) {
      localStorage.setItem('basket', JSON.stringify(state));
    },
    setInitial(state) {
      state.order = {
        price: 0,
        count: 0,
        create_time: 0,
        items: [],
      };
    },
    // datesLoading(state) {
    //   state.isLoading = true;
    // },
    // datesReceived(state, action) {
    //   // state.dates = action.payload;
    //   state.isLoading = false;
    // },
    // setCurrentDate(state, action) {
    //   state.currentDate = action.payload;
    // },
    // toggleConfetti(state) {
    //   state.isConfetti = !state.isConfetti;
    // },
  },
});

export const {
  addItem,
  updateCount,
  updatePrice,
  updateStorage,
  removeItem,
  plusItem,
  minusItem,
  setInitial
} = basketSlice.actions;

export const addToCart = (item: IProduct) => async (dispatch: AppDispatch) => {
  dispatch(addItem(item));
  dispatch(updateCount());
  dispatch(updatePrice());
  dispatch(updateStorage());
};

export const removeFromCart =
  (item: IProduct) => async (dispatch: AppDispatch) => {
    dispatch(removeItem(item));
    dispatch(updateCount());
    dispatch(updatePrice());
    dispatch(updateStorage());
  };

export const plusItemCart = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(plusItem(id));
  dispatch(updateCount());
  dispatch(updatePrice());
  dispatch(updateStorage());
};

export const minusItemCart = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(minusItem(id));
  dispatch(updateCount());
  dispatch(updatePrice());
  dispatch(updateStorage());
};

export const clearCart = () => async (dispatch: AppDispatch) => {
  dispatch(setInitial());
  dispatch(updateCount());
  dispatch(updatePrice());
  dispatch(updateStorage());
};

export default basketSlice.reducer;
