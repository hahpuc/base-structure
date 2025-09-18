import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(duration);

export const formatDate = (
  date: string | Date | undefined,
  format = "DD/MM/YYYY"
) => {
  if (!date) {
    return "";
  }
  return dayjs(date).local().format(format);
};

export const diffFromNow = (date: string | Date): string | undefined => {
  const timeDifference: number = dayjs(date).diff(new Date(), "second");

  if (timeDifference > 0) {
    const duration = dayjs.duration(timeDifference, "second");

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const parts = [];
    if (days > 0) {
      parts.push(`${days} ngày`);
    }
    if (hours > 0) {
      parts.push(`${hours} giờ`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} phút`);
    }
    if (seconds > 0 || parts.length === 0) {
      parts.push(`${seconds} giây`);
    }

    return parts.join(" ");
  }
  return;
};
