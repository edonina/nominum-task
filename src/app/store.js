import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoriesListReducer from '../features/categoriesList/categoriesListSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        categories: categoriesListReducer,
    },
});
