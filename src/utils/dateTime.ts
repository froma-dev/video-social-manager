const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const formatLongDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = MONTHS[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}`

    return {
        formattedDate,
        month,
        day,
        year,
        hours,
        minutes
    }

};