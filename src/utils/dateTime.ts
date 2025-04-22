const MONTHS = [
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
  "December",
];

export const formatLongDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}`;

  return {
    formattedDate,
    month,
    day,
    year,
    hours,
    minutes,
  };
};

export const formatToYYYY_MM_DD = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTodayDate = () => {
  const date = new Date();
  return formatToYYYY_MM_DD(date.toISOString());
};

export const getPastDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatToYYYY_MM_DD(date.toISOString());
};
