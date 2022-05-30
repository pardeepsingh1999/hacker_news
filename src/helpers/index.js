import toast from "react-hot-toast";
import moment from "moment";

export const structureQueryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]] || params[keys[index + 1]] === 0) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const showToast = (message, type = "error", duration = 4000) => {
  toast[type](message, { duration });
};

export const calculateWeekByTime = (timeStamp) => {
  var todayDate = moment();
  var pastDate = moment(timeStamp);
  var diffDays = todayDate.diff(pastDate, "days");
  const w = Math.floor(diffDays / 7);
  return `${w}w`;
};

export const formatTimeFromNow = (timeStamp) => {
  const formatDayOrWeek = (d) => {
    if (d >= 7) {
      const w = Math.floor(d / 7);
      return `${w}w`;
    }
    return `${d}d`;
  };

  const relativeTime = {
    future: "in %s",
    past: "%s ago",
    s: "Just now",
    ss: "%ss",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: (d) => formatDayOrWeek(d),
    M: (d) => calculateWeekByTime(timeStamp),
    MM: (d) => calculateWeekByTime(timeStamp),
    y: "1y",
    yy: "%dy",
  };

  moment.updateLocale("en", {
    relativeTime,
  });

  return moment(timeStamp).fromNow(false);
};
