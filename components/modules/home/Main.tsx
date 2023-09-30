'use client';

import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import TimeForm from './TimeForm';
import TimeTable from './TimeTable';

const Main = () => {
  const [fullHours, setFullHours] = useState<boolean>(false);
  const [matchingHours, setMatchingHours] = useState<{
    user1: string[];
    user2: string[];
  }>({
    user1: [],
    user2: [],
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-10 md:p-24">
      <div className="w-full h-auto flex flex-col justify-center items-start gap-2">
        <p className="text-md font-semibold">Filter</p>
        <div className="w-full h-full flex justify-start items-center gap-2">
          <div className="w-auto h-full flex justify-center items-center gap-2">
            <p>24 hours</p>
            <Switch
              checked={fullHours}
              onCheckedChange={setFullHours}
              className="h-5"
              pointerClassName="h-4 w-5"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-10">
        <TimeForm
          matchingHours={matchingHours}
          setMatchingHours={setMatchingHours}
          fullHours={fullHours}
        />
        <div className="w-full  md:w-1/2 h-full flex justify-center items-center">
          <TimeTable matchingHours={matchingHours} fullHours={fullHours} />
        </div>
      </div>
    </div>
  );
};
export default Main;
