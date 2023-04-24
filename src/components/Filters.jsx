import React from "react";
import { useAppContext } from "../context/AppContextProvider";

const Filters = ({ appliedFilters, filterName }) => {
  const { dispatch } = useAppContext();

  const filters = [
    { title: "Show unread mails", name: "unread", id: "unread" },
    { title: "Show starred mails", name: "isStarred", id: "isStarred" }
  ];

  return (
    <div className="filter-container">
      <p className="caption">Filters</p>
      {filters.map(({ title, name, id }) => {
        return (
          <React.Fragment key={id}>
            <input
              type="checkbox"
              name={name}
              id={id}
              checked={appliedFilters.includes(name)}
              onChange={(e) =>
                dispatch({
                  type: "HANDLE_FILTERS",
                  filterName,
                  e
                })
              }
            />
            <label htmlFor={id}>{title}</label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Filters;
