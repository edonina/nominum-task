import React from "react";

export const CategoriesSelectBar = props => {
    const {
        forbidAll,
        approveAll,
        forbiddenCategoriesAmmount,
        approvedCategoriesAmmount,
        categoriesAmmount
    } = props.props;

    return (
        <div className="categories__select-bar">
            <button
                className="categories__select-button"
                onClick={() => forbidAll()}
                disabled={forbiddenCategoriesAmmount === categoriesAmmount}
            >
                <i className="fa fa-simplybuilt fa-forbidden"></i>Forbid all
            </button>
            <button
                className="categories__select-button"
                onClick={() => approveAll()}
                disabled={approvedCategoriesAmmount === categoriesAmmount}
            >
                <i className="fa fa-smile-o fa-approved"></i>Approve all
            </button>
        </div>
    );
};
