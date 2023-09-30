const TimeTable = ({
  matchingHours,
  fullHours,
}: {
  fullHours: boolean;
  matchingHours: {
    user1: string[];
    user2: string[];
  };
}) => {
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  const convertTo12HourFormat = (hour: number) => {
    // Determine whether it's AM or PM
    const period = hour < 12 ? 'AM' : 'PM';

    // Convert to 12-hour format
    const hours12Hour = hour % 12 || 12; // Convert 0 to 12 for 12:00 AM/PM

    // Create the formatted time string
    const time12Hour = `${hours12Hour} ${period}`;

    return fullHours ? `${hour}:00` : time12Hour;
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-5">
      <div className="w-36 flex flex-col justify-start items-start gap-3 ">
        <h3 className="md:text-md text-sm font-semibold">User 1 Timezone</h3>
        <div className="w-full flex flex-col gap-1 ">
          {hoursOfDay.map((hour) => (
            <div
              key={hour}
              className={`w-full h-8 p-2 border-2
                  border-slate-500 rounded-md 
                  text-sm flex justify-center items-center
                  ${
                    matchingHours?.user1?.length > 0
                      ? matchingHours?.user1?.includes(`${hour}`)
                        ? 'bg-green-400'
                        : 'bg-red-400'
                      : 'bg-white'
                  } `}
            >
              {convertTo12HourFormat(hour)}
            </div>
          ))}
        </div>
      </div>
      <div className="w-36 flex flex-col justify-start items-start gap-3 ">
        <h3 className="md:text-md text-sm font-semibold">User 2 Timezone</h3>
        <div className="w-full flex flex-col gap-1  ">
          {hoursOfDay.map((hour) => (
            <div
              key={hour}
              className={`w-full h-8 p-2 border-2
                border-slate-500 rounded-md 
                text-sm flex justify-center items-center
                ${
                  matchingHours?.user2?.length > 0
                    ? matchingHours?.user2?.includes(`${hour}`)
                      ? 'bg-green-400'
                      : 'bg-red-400'
                    : 'bg-white'
                } `}
            >
              {convertTo12HourFormat(hour)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
