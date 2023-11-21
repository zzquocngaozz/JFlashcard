export const isBirthDate = (birthDate) => {
  let bornAt = new Date(birthDate);

  const current = Date.now();

  return current > bornAt;
};

export const checkDueAt = (dueAt) => {
  // Tạo một đối tượng Date cho thời điểm hiện tại
  const currentDate = new Date();

  // Tạo một đối tượng Date cho thời điểm `dueAt`
  const dueDate = new Date(dueAt);

  // Tính thời gian cach nhau tính bằng mili giây (1 ngày = 24 giờ x 60 phút x 60 giây x 1000 mili giây)
  const timeDifference = dueDate.getTime() - currentDate.getTime();

  // xac dinh khoang cach ngay giua current date va due date (24 * 60 * 60 * 1000)
  const daysSpace = (timeDifference + 60 * 1000) / (24 * 60 * 60 * 1000);

  // Kiem tra due date >= 3 ngay current date
  return daysSpace >= 3;
};

export const parseBirth = (birth) => {
  const date = new Date(birth);

  let day = date.getDate();
  day = day < 10 ? `0${day}` : `${day}`;
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : `${month}`;
  let year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export function formatTime(createAt) {
  const currentTime = new Date().getTime();
  const timestamp = new Date(createAt).getTime();
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 365) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1
    return `${month}/${year}`;
  }
  if (days >= 30) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1
    const day = date.getDate();
    return `${day} tháng ${month}`;
  }
  if (days > 0) {
    return days + " ngày trước";
  }
  if (hours > 0) {
    return hours + " giờ trước";
  }
  if (minutes > 0) {
    return minutes + " phút trước";
  }

  return "vài giây trước";
}

export const getWeekDate = (weekIndex) => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const monOfWeek =
    currentDate.getTime() -
    (day - 1) * 24 * 60 * 60 * 1000 -
    weekIndex * 7 * 24 * 60 * 60 * 1000;
  const sunOfWeek = monOfWeek + 6 * 24 * 60 * 60 * 1000;

  return { startDate: new Date(monOfWeek), endDate: new Date(sunOfWeek) };
};
export function numOfWeek(startDate, endDate) {
  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7; // Số mili giây trong một tuần
  const difference =
    endDate.getTime() -
    (endDate.getDay() - 1) * 24 * 60 * 60 * 1000 -
    (startDate.getTime() - (startDate.getDay() - 1) * 24 * 60 * 60 * 1000);
  const numberOfWeeks = Math.floor(difference / millisecondsPerWeek); // Số tuần

  return numberOfWeeks !== 0 ? numberOfWeeks : 1;
}

export const getWeekDateOption = (weekIndex) => {
  const dateOfWeek = getWeekDate(weekIndex);
  return `${dateRangeFormat(dateOfWeek.startDate)} - ${dateRangeFormat(
    dateOfWeek.endDate
  )}`;
};

const dateRangeFormat = (date) => {
  const d = new Date(date);

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};
