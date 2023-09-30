import moment from 'moment-timezone';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  matches: router({}),
  find: publicProcedure
    .input(
      z.object({
        user1TimeZone: z.string(),
        user2TimeZone: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { user1TimeZone, user2TimeZone } = input;

      // Function to check if an hour in timeZone1 is within the range of hours in timeZone2
      function isHourInTimeZone1WithinRangeOfTimeZone2(
        utcOffset1: string,
        utcOffset2: string
      ) {
        const time1Overlap = [],
          time2Overlap = [];

        // Extract the numeric part of the UTC offsets
        const offset1Numeric = parseInt(utcOffset1.split('utc')[1]);
        const offset2Numeric = parseInt(utcOffset2.split('utc')[1]);

        // Determine the sign for the UTC offsets
        const offset1Sign = utcOffset1.includes('-') ? -1 : 1;
        const offset2Sign = utcOffset2.includes('-') ? -1 : 1;

        // Calculate the total offset in minutes
        const totalOffset1 = offset1Numeric * 60 * offset1Sign;
        const totalOffset2 = offset2Numeric * 60 * offset2Sign;

        for (let hour = 7; hour <= 22; hour++) {
          // Create a moment object for the current hour in timeZone1 (utcOffset1)
          const checkTime1 = moment().utcOffset(totalOffset1); // Convert to minutes

          // Set the hour and reset the minutes, seconds, and milliseconds
          checkTime1.hours(hour).minutes(0).seconds(0).milliseconds(0);

          // Create a moment object for the same hour in timeZone2 (utcOffset2)
          const checkTime2 = checkTime1.clone().utcOffset(totalOffset2);

          // Check if the hour is within the specified range
          if (7 <= checkTime2.hours() && checkTime2.hours() <= 22) {
            time1Overlap.push(`${checkTime1.hours()}`);
            time2Overlap.push(`${checkTime2.hours()}`);
          }
        }
        return { time1Overlap, time2Overlap };
      }

      try {
        // Define the time ranges for 7 am and 10 pm in both time zones
        const startTime = new Date();
        startTime.setUTCHours(7, 0, 0); // Set to 7 am UTC

        const endTime = new Date();
        endTime.setUTCHours(22, 0, 0); // Set to 10 pm UTC

        // Find the overlapping hours
        const data = isHourInTimeZone1WithinRangeOfTimeZone2(
          user1TimeZone,
          user2TimeZone
        );
        return data;
      } catch (error: any) {
        console.log(error);
        throw error;
      }
    }),
});

export type AppRouter = typeof appRouter;
