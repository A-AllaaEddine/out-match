'use client';

import { trpc } from '@/app/_trpc/client';
import CustomSelect from '@/components/commun/static/Select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';

const TimeForm = ({
  matchingHours,
  setMatchingHours,
  fullHours,
}: {
  fullHours: boolean;
  matchingHours: { user1: string[]; user2: string[] };
  setMatchingHours: Dispatch<
    SetStateAction<{ user1: string[]; user2: string[] }>
  >;
}) => {
  const [formFields, setFromFields] = useState({
    user1TimeZone: '',
    user2TimeZone: '',
  });

  const {
    mutateAsync: findMatches,
    isLoading,
    isError,
    error,
  } = trpc.find.useMutation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formFields?.user1TimeZone.length) {
      alert('Please select a time zone for user 1. ');
      return;
    }
    if (!formFields?.user2TimeZone.length) {
      alert('Please select a time zone for user 2. ');
      return;
    }

    try {
      const data = await findMatches({
        user1TimeZone: formFields?.user1TimeZone,
        user2TimeZone: formFields?.user2TimeZone,
      });
      if (isError) {
        throw error;
      }
      setMatchingHours({
        user1: data.time1Overlap,
        user2: data.time2Overlap,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const convertTo12HourFormat = (startHour: number, endHour: number) => {
    // Determine whether it's AM or PM
    const startPeriod = startHour < 12 ? 'AM' : 'PM';
    const endPeriod = endHour < 12 ? 'AM' : 'PM';

    // Convert to 12-hour format
    const start12Hour = startHour % 12 || 12; // Convert 0 to 12 for 12:00 AM/PM
    const end12Hour = endHour % 12 || 12; // Convert 0 to 12 for 12:00 AM/PM

    // Create the formatted time string
    const startTime12Hour = `${start12Hour} ${startPeriod}`;
    const endTime12Hour = `${end12Hour} ${endPeriod}`;

    return fullHours
      ? `${startHour}:00 - ${endHour}:00`
      : `${startTime12Hour} - ${endTime12Hour}`;
  };

  return (
    <form
      className="w-full max-w-[18rem] md:w-[400px] h-auto flex flex-col justify-start items-center gap-3"
      onSubmit={handleSubmit}
    >
      <Label className="text-md md:text-xl font-semibold w-full text-start">
        User 1
      </Label>
      <CustomSelect
        options={timeZones}
        onChange={(e) => {
          if (e !== formFields?.user1TimeZone) {
            setMatchingHours({ user1: [], user2: [] });
            setFromFields((prev) => {
              return { ...prev, user1TimeZone: e };
            });
          }
        }}
        className="w-full h-10 md:h-12"
      />
      <Label className="text-md md:text-xl font-semibold w-full text-start">
        User 2
      </Label>
      <CustomSelect
        options={timeZones}
        onChange={(e) => {
          if (e !== formFields?.user2TimeZone) {
            setMatchingHours({ user1: [], user2: [] });
            setFromFields((prev) => {
              return { ...prev, user2TimeZone: e };
            });
          }
        }}
        className="w-full h-10 md:h-12"
      />
      <Button
        type="submit"
        className="w-full h-10 md:h-12 bg-black text-white text-md md:text-lg text-center"
      >
        {isLoading ? 'Loading...' : 'Find'}
      </Button>
      <Label className="text-md md:text-xl font-semibold w-full text-start">
        User 1
      </Label>
      <Textarea
        value={
          matchingHours?.user1?.length > 0
            ? convertTo12HourFormat(
                parseInt(matchingHours?.user1[0]),
                parseInt(matchingHours?.user1[matchingHours?.user1.length - 1])
              )
            : ''
        }
        className="resize-none text-md text-black"
        rows={3}
        readOnly
      />
      <Label className="text-md md:text-xl font-semibold w-full text-start">
        User 2
      </Label>
      <Textarea
        value={
          matchingHours?.user2?.length > 0
            ? convertTo12HourFormat(
                parseInt(matchingHours?.user2[0]),
                parseInt(matchingHours?.user2[matchingHours?.user2.length - 1])
              )
            : ''
        }
        className="resize-none text-md text-black"
        rows={3}
        readOnly
      />
    </form>
  );
};

export default TimeForm;

const timeZones = [
  { value: 'Select a timezone', label: 'Select a timezone' },
  { value: 'utc+12', label: 'UTC+12' },
  { value: 'utc+11', label: 'UTC+11' },
  { value: 'utc+10', label: 'UTC+10' },
  { value: 'utc+9', label: 'UTC+9' },
  { value: 'utc+8', label: 'UTC+8' },
  { value: 'utc+7', label: 'UTC+7' },
  { value: 'utc+6', label: 'UTC+6' },
  { value: 'utc+5', label: 'UTC+5' },
  { value: 'utc+4', label: 'UTC+4' },
  { value: 'utc+3', label: 'UTC+3' },
  { value: 'utc+2', label: 'UTC+2' },
  { value: 'utc+1', label: 'UTC+1' },
  { value: 'utc+0', label: 'UTC+0' },
  { value: 'utc-1', label: 'UTC-1' },
  { value: 'utc-2', label: 'UTC-2' },
  { value: 'utc-3', label: 'UTC-3' },
  { value: 'utc-4', label: 'UTC-4' },
  { value: 'utc-5', label: 'UTC-5' },
  { value: 'utc-6', label: 'UTC-6' },
  { value: 'utc-7', label: 'UTC-7' },
  { value: 'utc-8', label: 'UTC-8' },
  { value: 'utc-9', label: 'UTC-9' },
  { value: 'utc-10', label: 'UTC-10' },
  { value: 'utc-11', label: 'UTC-11' },
  { value: 'utc-12', label: 'UTC-12' },
];
