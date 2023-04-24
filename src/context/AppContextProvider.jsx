import { createContext, useContext, useReducer } from "react";
import { mails } from "../mailsDB";

const AppContext = createContext({
  state: {},
  dispatch: () => {}
});

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_READ": {
      return {
        ...state,
        mailList: state.mailList.map((mail) =>
          mail.mId === action.id ? { ...mail, unread: !mail.unread } : mail
        )
      };
    }

    case "TOGGLE_STAR": {
      return {
        ...state,
        mailList: state.mailList.map((mail) =>
          mail.mId === action.id
            ? { ...mail, isStarred: !mail.isStarred }
            : mail
        )
      };
    }

    case "DELETE_MAIL": {
      return {
        ...state,
        inbox: state.inbox.filter((mId) => mId !== action.id),
        trash: [...state.trash, action.id]
      };
    }

    case "MOVE_TO_SPAM": {
      return {
        ...state,
        inbox: state.inbox.filter((mId) => mId !== action.id),
        spam: [...state.spam, action.id]
      };
    }

    case "HANDLE_FILTERS": {
      return {
        ...state,
        [action.filterName]: action.e.target.checked
          ? [...state[action.filterName], action.e.target.name]
          : state[action.filterName].filter(
              (item) => item !== action.e.target.name
            )
      };
    }

    default:
      break;
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    mailList: mails,
    inbox: mails.map(({ mId }) => mId),
    spam: [],
    trash: [],
    appliedInboxFilters: [],
    appliedSpamFilters: [],
    appliedTrashFilters: []
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
