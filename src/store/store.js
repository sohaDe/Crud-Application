import recordsSlice from "./recordsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    records: recordsSlice,
  },
});
export default store;
