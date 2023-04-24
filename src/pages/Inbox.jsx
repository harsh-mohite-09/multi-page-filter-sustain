import { useAppContext } from "../context/AppContextProvider";
import MailCard from "../components/MailCard";
import Filters from "../components/Filters";

const Inbox = () => {
  const {
    state: { inbox, mailList, appliedInboxFilters }
  } = useAppContext();

  const inboxList = mailList.filter(({ mId }) => inbox.includes(mId));

  const unreadMails = inboxList.filter(({ unread }) => unread).length;

  // OR Logic

  const filteredList =
    appliedInboxFilters.length > 0
      ? inboxList.filter((mail) =>
          appliedInboxFilters.some((filter) => mail[filter])
        )
      : inboxList;

  // AND Logic

  // const filteredList =
  //   appliedInboxFilters.length > 0
  //     ? inbox.filter((mail) =>
  //         appliedInboxFilters.every((filter) => mail[filter])
  //       )
  //     : inbox;

  return (
    <div className="inbox">
      <Filters
        appliedFilters={appliedInboxFilters}
        filterName="appliedInboxFilters"
      />
      <p>
        <b>Unread: {unreadMails}</b>
      </p>
      <div className="mail-container">
        {filteredList.map((mail) => (
          <MailCard mail={mail} key={mail.mId} isInbox />
        ))}
      </div>
    </div>
  );
};

export default Inbox;
