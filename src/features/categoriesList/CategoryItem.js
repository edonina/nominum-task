import React from "react";
import ReactTooltip from "react-tooltip";

export const CategoryItem = props => {
    const { item, onClick } = props.props;
    return (
        <li
            key={item.id}
            onClick={() => onClick(item.id)}
            className="categories__list-item"
        >
            {item.status === "forbidden" ? (
                <i className="fa fa-simplybuilt fa-border fa-forbidden"></i>
            ) : (
                <i className="fa fa-smile-o fa-border fa-approved"></i>
            )}
            {item.name}
            <i
                className="fa fa-info categories__info"
                data-tip={item.description}
                data-text-color="grey"
                data-background-color="white"
                data-border-color="black"
            ></i>
            <ReactTooltip className="categories__tooltip" />
        </li>
    );
};
