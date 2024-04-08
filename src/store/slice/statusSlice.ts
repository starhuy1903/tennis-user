import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StatusSliceType = {
  isLoading: boolean;
};

const initialState: StatusSliceType = {
  isLoading: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = statusSlice.actions;
