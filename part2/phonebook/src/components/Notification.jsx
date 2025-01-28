const Notification = ({ message, notificationStyles }) => {
    if (message === null) {
        return;
    } else {
        return (
            <div className={notificationStyles}>
                {message}
            </div>
        )
    }
}

export default Notification
