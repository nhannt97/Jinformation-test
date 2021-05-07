import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const namespace = 'app';

export type itemType = {
  image: string,
  author: string,
  tags: string,
  thumbnailImage: string,
}

export type fetchDataPayloadType = {
  page: number,
  tags: string,
  callback: () => void
}

const initialState: {
  data: itemType[],
  page: number
} = {
  data: [],
  page: 1
};

export const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<fetchDataPayloadType>) => ({
      ...state
    }),
    fetchDataSuccess: (state, action: PayloadAction<any[]>) => ({
      ...state,
      data: action.payload
    }),
    fetchDataError: (state) => ({
      ...state,
      data: []
    })
  }
});

// Action creators are generated for each case reducer function
export const {
  fetchData,
  fetchDataError,
  fetchDataSuccess
} = slice.actions;
// Selector
export const appSelector = (store: any) => store[namespace];
// Reducer
export const { reducer } = slice;

export { rootSagas as saga } from './saga';
