import React from "react";
import { CategoryItem } from "./CategoryItem";

export const CategoriesList = props => {
    const { categoriesList, onClick } = props.props;
    if (categoriesList.length) {
        return (
            <ul className="categories__list">
                {categoriesList.map(item => (
                    <CategoryItem
                        key={item.id}
                        props={{
                            item,
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
