import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    forbidAll,
    approveAll,
    selectCategories,
    categoriesReceived,
    toggleApprovedFilter,
    toggleForbiddenFilter,
    selectForbiddenCategoriesAmmount,
    selectApprovedCategoriesAmmount,
    selectIsApprovedFilterApplied,
    selectIsForbiddenFilterApplied,
    selectCategoriesAmmount,
    toggleApprove
} from "./categoriesListSlice";
import "./CategoriesList.scss";
import axios from "axios";
import { CategoriesList } from "./CategoriesList";
import { CategoriesSelectBar } from "./CategoriesSelectBar";
import { CategoriesFilterBar } from "./CategoriesFilterBar";

const API_URL = "http://localhost:8080/categories";

export function CategoriesContainer() {
    const categoriesList = useSelector(selectCategories);
    const categoriesAmmount = useSelector(selectCategoriesAmmount);

    const forbiddenCategoriesAmmount = useSelector(
        selectForbiddenCategoriesAmmount
    );
    const approvedCategoriesAmmount = useSelector(
        selectApprovedCategoriesAmmount
    );

    const isApprovedFilterApplied = useSelector(selectIsApprovedFilterApplied);
    const isForbiddenFilterApplied = useSelector(
        selectIsForbiddenFilterApplied
    );

    const dispatch = useDispatch();

    const getCategories = async () => {
        try {
            const response = await axios.get(API_URL);
            dispatch(categoriesReceived(response.data));

            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="categories">
            <div className="categories__container">
                <CategoriesList
                    props={{
                        categoriesList,
                        onClick: id => {
                            return dispatch(toggleApprove(id));
                        }
                    }}
                />
            </div>
            <footer className="categories__bar">
                <CategoriesSelectBar
                    props={{
                        forbidAll: () => dispatch(forbidAll()),
                        approveAll: () => dispatch(approveAll()),
                        forbiddenCategoriesAmmount,
                        approvedCategoriesAmmount,
                        categoriesAmmount
                    }}
                />
                <CategoriesFilterBar
                    props={{
                        toggleApprovedFilter: () =>
                            dispatch(toggleApprovedFilter()),
                        toggleForbiddenFilter: () =>
                            dispatch(toggleForbiddenFilter()),
                        forbiddenCategoriesAmmount,
                        approvedCategoriesAmmount,
                        isApprovedFilterApplied,
                        isForbiddenFilterApplied
                    }}
                />
            </footer>
        </div>
    );
}
