import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery:"",
  filters: { // this variable is for filtering
    categories: [], // e.g. ["vegetables", "fruits"]
    priceRange: { min: 0, max: 1000 },
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery:(state,action)=>{
          state.searchQuery = action.payload;
    },
    
    toggleCategory:(state,action)=>{
      const category = action.payload;
      if(state.filters.categories.includes(category)){
         state.filters.categories = state.filters.categories.filter(
          (c)=>c!==category
         )
      }else{
        state.filters.categories.push(category);
      }
    },

    setPriceRange:(state,action)=>{
      state.filters.priceRange = action.payload
    },

    clearCategory: (state) => {
      state.filters.categories = []
    },
    clearPrice :(state)=>{
      state.filters.priceRange = { min: 0, max: 1000 }
    }

  },
});

export const {
  setSearchQuery,
  toggleCategory,
  setPriceRange,
  clearCategory,
  clearPrice
} = productSlice.actions;

export default productSlice.reducer;
