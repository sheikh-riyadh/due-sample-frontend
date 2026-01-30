import { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

const CountDown = ({ data }) => {
  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    const targetTime = moment(
      `${data?.nextCollectionDate} ${data?.nextCollectionTime}`,
      "YYYY-MM-DD HH:mm"
    );

    const interval = setInterval(() => {
      const now = moment();
      const diffInSeconds = targetTime.diff(now, "seconds");
      setTimeDiff(diffInSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const formatTime = (seconds) => {
    const absSeconds = Math.abs(seconds);
    const duration = moment.duration(absSeconds, "seconds");

    const hours = String(Math.floor(duration.asHours())).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const secs = String(duration.seconds()).padStart(2, "0");

    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="font-bold">
      {timeDiff > 0 ? (
        <p className="text-xl">
          <span className="bg-green-600 text-white px-3 rounded-full">{formatTime(timeDiff)}</span>
        </p>
      ) : (
        <p className="text-xl">
         <span className="bg-rose-600 text-white px-3 rounded-full"> {formatTime(timeDiff)}</span>
        </p>
      )}
    </div>
  );
};


CountDown.propTypes = {
  data: PropTypes.object,
};

export default CountDown;
