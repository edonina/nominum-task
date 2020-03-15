import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'categories',
    initialState: {
        categoriesList: [],
        isApprovedFilterApplied: false,
        isForbiddenFilterApplied: false,
        loading: 'idle',
    },
    reducers: {
        categoriesLoading(state, action) {
            // Use a "state machine" approach for loading state instead of booleans
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        },
        categoriesReceived(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.categoriesList = action.payload.map(item => ({
                    ...item,
                    status: 'approved',
                }));
            }
        },
        forbidAll(state, action) {
            state.categoriesList = state.categoriesList.map(item => ({
                ...item,
                status: 'forbidden',
            }));
        },
        approveAll(state, action) {
            state.categoriesList = state.categoriesList.map(item => ({
                ...item,
                status: 'approved',
            }));
        },
        toggleApprove(state, action) {
            console.log('action.payload', action.payload);
            const status =
                state.categoriesList[action.payload].status === 'approved'
                    ? 'forbidden'
                    : 'approved';
            state.categoriesList[action.payload].status = status;
        },
        toggleApprovedFilter(state) {
            state.isApprovedFilterApplied = !state.isApprovedFilterApplied;
        },
        toggleForbiddenFilter(state) {
            state.isForbiddenFilterApplied = !state.isForbiddenFilterApplied;
        },
    },
});

export const {
    categoriesLoading,
    categoriesReceived,
    toggleForbiddenFilter,
    toggleApprovedFilter,
    approveAll,
    forbidAll,
    toggleApprove,
} = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCategories = state => {
    return state.categories.categoriesList.filter(item => {
        if (
            (!state.categories.isApprovedFilterApplied &&
                !state.categories.isForbiddenFilterApplied) ||
            (state.categories.isApprovedFilterApplied &&
                state.categories.isForbiddenFilterApplied)
        ) {
            return true;
        }

        if (state.categories.isApprovedFilterApplied) {
            return item.status === 'approved';
        }
        if (state.categories.isForbiddenFilterApplied) {
            return item.status === 'forbidden';
        }
        return false;
    });
};
export const selectApprovedCategories = state => {
    return state.categories.categoriesList.filter(item => item.status === 'approved');
};
export const selectApprovedCategoriesAmmount = state => {
    return state.categories.categoriesList.filter(item => item.status === 'approved')
        .length;
};

export const selectForbiddenCategories = state => {
    return state.categories.categoriesList.filter(item => item.status === 'forbidden');
};

export const selectForbiddenCategoriesAmmount = state => {
    return state.categories.categoriesList.filter(item => item.status === 'forbidden')
        .length;
};

export const selectIsApprovedFilterApplied = state => {
    return state.categories.isApprovedFilterApplied;
};

export const selectIsForbiddenFilterApplied = state => {
    return state.categories.isForbiddenFilterApplied;
};
export const selectCategoriesAmmount = state => {
    return state.categories.categoriesList.length;
};

export default slice.reducer;