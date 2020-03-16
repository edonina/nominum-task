import React from "react";
import { CategoryItem } from "./CategoryItem";

export const CategoriesList = props => {
    const { categoriesList, onClick } = props.props;
    if (categoriesList) {
        return (
            <ul className="categoriesList">
                {categoriesList.map((item, index) => (
                    <CategoryItem
                        key={index}
                        props={{
                            item,
                            index,
                            onClick
                        }}
                    />
                ))}
            </ul>
        );
    } else {
        return <p>No categories found</p>;
    }
};
