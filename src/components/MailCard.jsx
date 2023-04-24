import { useAppContext } from "../context/AppContextProvider";
import parse from "html-react-parser";

const MailCard = ({ mail, isInbox }) => {
  const { dispatch } = useAppContext();
  const { mId, unread, isStarred, subject, content } = mail;
  return (
    <div className="mail-card">
      <div className="card-header">
        <h4>Subject: {subject}</h4>
        <button
          className={`btn ${isStarred && "btn-starred"}`}
          onClick={() => dispatch({ type: "TOGGLE_STAR", id: mId })}
        >
          {isStarred ? "Starred" : "Star"}
        </button>
      </div>
      <p>{parse(content)}</p>

      <div className="card-footer">
        <button>View Details</button>
        <div className="btn-group">
          {isInbox && (
            <button
              className="btn btn-red"
              onClick={() => dispatch({ type: "DELETE_MAIL", id: mId })}
            >
              Delete
            </button>
          )}
          <button
            className={`btn btn-yellow ${!unread && "btn-read"}`}
            onClick={() => dispatch({ type: "TOGGLE_READ", id: mId })}
          >
            Mark as {unread ? "Read" : "Unread"}
          </button>
          {isInbox && (
            <button
              className="btn btn-green"
              onClick={() => dispatch({ type: "MOVE_TO_SPAM", id: mId })}
            >
              Report Spam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailCard;
