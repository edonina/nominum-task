import { createSlice } from "@reduxjs/toolkit";

const generateId = function() {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
};

export const slice = createSlice({
    name: "categories",
    initialState: {
        categoriesList: [],
        isApprovedFilterApplied: false,
        isForbiddenFilterApplied: false
    },
    reducers: {
        categoriesReceived(state, action) {
            state.categoriesList = action.payload.map(item => ({
                ...item,
                id: generateId(),
                status: "approved"
            }));
        },
        forbidAll(state, action) {
            state.categoriesList = state.categoriesList.map(item => ({
                ...item,
                status: "forbidden"
            }));
        },
        approveAll(state) {
            state.categoriesList = state.categoriesList.map(item => ({
                ...item,
                status: "approved"
            }));
        },
        toggleApprove(state, action) {
            const item = state.categoriesList.find(item => {
                return item.id === action.payload;
            });
            item.status = item.status == "approved" ? "forbidden" : "approved";
        },
        toggleApprovedFilter(state) {
            state.isApprovedFilterApplied = !state.isApprovedFilterApplied;
            if (
                state.isForbiddenFilterApplied === true &&
                state.isApprovedFilterApplied === true
            ) {
                state.isForbiddenFilterApplied = false;
            }
        },
        toggleForbiddenFilter(state) {
            state.isForbiddenFilterApplied = !state.isForbiddenFilterApplied;
            if (
                state.isForbiddenFilterApplied === true &&
                state.isApprovedFilterApplied === true
            ) {
                state.isApprovedFilterApplied = false;
            }
        }
    }
});

export const {
    categoriesReceived,
    toggleForbiddenFilter,
    toggleApprovedFilter,
    approveAll,
    forbidAll,
    toggleApprove
} = slice.actions;

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
            return item.status === "approved";
        }
        if (state.categories.isForbiddenFilterApplied) {
            return item.status === "forbidden";
        }
        return false;
    });
};
export const selectApprovedCategories = state => {
    return state.categories.categoriesList.filter(
        item => item.status === "approved"
    );
};
export const selectApprovedCategoriesAmmount = state => {
    return state.categories.categoriesList.filter(
        item => item.status === "approved"
    ).length;
};

export const selectForbiddenCategories = state => {
    return state.categories.categoriesList.filter(
        item => item.status === "forbidden"
    );
};

export const selectForbiddenCategoriesAmmount = state => {
    return state.categories.categoriesList.filter(
        item => item.status === "forbidden"
    ).length;
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
