import { useAppContext } from "../context/AppContextProvider";
import MailCard from "../components/MailCard";
import Filters from "../components/Filters";

const Spam = () => {
  const {
    state: { spam, mailList, appliedSpamFilters }
  } = useAppContext();

  const spamList = mailList.filter(({ mId }) => spam.includes(mId));

  const filteredList =
    appliedSpamFilters.length > 0
      ? spamList.filter((mail) =>
          appliedSpamFilters.some((filter) => mail[filter])
        )
      : spamList;

  return (
    <div className="inbox">
      <Filters
        appliedFilters={appliedSpamFilters}
        filterName="appliedSpamFilters"
      />
      <h3>Spam Mails: {spam.length}</h3>
      <div className="mail-container">
        {filteredList.map((mail) => (
          <MailCard mail={mail} key={mail.mId} />
        ))}
      </div>
    </div>
  );
};

export default Spam;
