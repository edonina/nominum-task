import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import {
    forbidAll,
    approveAll,
    selectCategories,
    categoriesLoading,
    categoriesReceived,
    toggleApprovedFilter,
    toggleForbiddenFilter,
    selectForbiddenCategoriesAmmount,
    selectApprovedCategoriesAmmount,
    selectIsApprovedFilterApplied,
    selectIsForbiddenFilterApplied,
    selectCategoriesAmmount,
    toggleApprove,
} from './categoriesListSlice';
import './CategoriesList.scss';
import axios from 'axios';

export function CategoriesList() {
    const categoriesList = useSelector(selectCategories);
    const categoriesAmmount = useSelector(selectCategoriesAmmount);
    const forbiddenCategoriesAmmount = useSelector(selectForbiddenCategoriesAmmount);
    const approvedCategoriesAmmount = useSelector(selectApprovedCategoriesAmmount);
    const isApprovedFilterApplied = useSelector(selectIsApprovedFilterApplied);
    const isForbiddenFilterApplied = useSelector(selectIsForbiddenFilterApplied);

    const dispatch = useDispatch();
    // const [incrementAmount, setIncrementAmount] = useState('2');

    const getCategories = async () => {
        try {
            dispatch(categoriesLoading());
            const response = await axios.get('http://localhost:8080/categories');
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
            <div className="categoriesContainer">
                <ul className="categoriesList">
                    {categoriesList.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                return dispatch(toggleApprove(index));
                            }}
                        >
                            {item.status === 'forbidden' ? (
                                <i className="fa fa-simplybuilt fa-border fa-forbidden"></i>
                            ) : (
                                <i className="fa fa-smile-o fa-border fa-approved"></i>
                            )}
                            {item.name}{' '}
                            <i
                                className="fa fa-info category--info"
                                data-tip={item.description}
                                data-text-color="grey"
                                data-background-color="white"
                                data-border-color="black"
                            ></i>
                            <ReactTooltip className="category--tooltip" />
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="categoriesBar">
                <div className="categoriesBarLeft">
                    <button
                        onClick={() => dispatch(forbidAll())}
                        disabled={forbiddenCategoriesAmmount === categoriesAmmount}
                    >
                        <i className="fa fa-simplybuilt fa-forbidden"></i>Forbid all
                    </button>
                    <button
                        onClick={() => dispatch(approveAll())}
                        disabled={approvedCategoriesAmmount === categoriesAmmount}
                    >
                        <i className="fa fa-smile-o fa-approved"></i>Approve all
                    </button>
                </div>

                <div className="categoriesFilters">
                    Filters
                    <button
                        className={classNames({
                            categoriesFiltersButton: true,
                            active: isApprovedFilterApplied,
                        })}
                        onClick={() => dispatch(toggleApprovedFilter())}
                    >
                        Approved {approvedCategoriesAmmount}
                    </button>
                    <button
                        className={classNames({
                            categoriesFiltersButton: true,
                            active: isForbiddenFilterApplied,
                        })}
                        onClick={() => dispatch(toggleForbiddenFilter())}
                    >
                        Forbidden {forbiddenCategoriesAmmount}
                    </button>
                </div>
            </footer>
        </div>
    );
}
