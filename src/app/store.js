import { configureStore } from "@reduxjs/toolkit";
import categoriesListReducer from "../features/categoriesList/categoriesListSlice";

export default configureStore({
    reducer: {
        categories: categoriesListReducer
    }
});
