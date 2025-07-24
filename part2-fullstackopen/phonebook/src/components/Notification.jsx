const Notification = ({ message, info }) => {
  if (message === null) return null;
  return (
    <>
      <h3 className={info}>{message}</h3>
    </>
  );
};

export default Notification;
