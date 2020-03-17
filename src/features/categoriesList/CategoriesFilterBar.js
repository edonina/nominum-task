import React from "react";
import classNames from "classnames";

export const CategoriesFilterBar = props => {
    const {
        toggleApprovedFilter,
        toggleForbiddenFilter,
        forbiddenCategoriesAmmount,
        approvedCategoriesAmmount,
        isApprovedFilterApplied,
        isForbiddenFilterApplied
    } = props.props;

    return (
        <div className="categories__filters">
            Filters
            <button
                className={classNames({
                    "categories__filter-button": true,
                    active: isApprovedFilterApplied
                })}
                onClick={toggleApprovedFilter}
            >
                Approved {approvedCategoriesAmmount}
            </button>
            <button
                className={classNames({
                    "categories__filter-button": true,
                    active: isForbiddenFilterApplied
                })}
                onClick={toggleForbiddenFilter}
            >
                Forbidden {forbiddenCategoriesAmmount}
            </button>
        </div>
    );
};
