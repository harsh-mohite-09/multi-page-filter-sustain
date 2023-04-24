import { useAppContext } from "../context/AppContextProvider";
import MailCard from "../components/MailCard";
import Filters from "../components/Filters";

const Trash = () => {
  const {
    state: { trash, mailList, appliedTrashFilters }
  } = useAppContext();

  const trashList = mailList.filter(({ mId }) => trash.includes(mId));

  const filteredList =
    appliedTrashFilters.length > 0
      ? trashList.filter((mail) =>
          appliedTrashFilters.some((filter) => mail[filter])
        )
      : trashList;

  return (
    <div className="inbox">
      <Filters
        appliedFilters={appliedTrashFilters}
        filterName="appliedTrashFilters"
      />
      <h3>Trash Mails: {trash.length}</h3>
      <div className="mail-container">
        {filteredList.map((mail) => (
          <MailCard mail={mail} key={mail.mId} />
        ))}
      </div>
    </div>
  );
};

export default Trash;
