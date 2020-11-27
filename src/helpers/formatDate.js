const formatDate = (dateObject, year = false) => {
    const date = new Date(dateObject);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const day = date.getDay();
    const dayDate = date.getDate();
    const month = date.getMonth();
    const fullYear = date.getFullYear();

    let dateString = "";

    if (year) {
        dateString = `${days[day]}, ${months[month]} ${dayDate}, ${fullYear}`;
        return dateString;
    }

    dateString = `${days[day]}, ${months[month]} ${dayDate}`;
    return dateString;
}

export default formatDate;