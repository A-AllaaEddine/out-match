import Main from '@/components/modules/home/Main';
import { Metadata } from 'next';

export default function Home() {
  return <Main />;
}

export const metadata: Metadata = {
  title: 'Our Match | Home',
  description:
    'Find the matching hours between two time zones so you and your partner can hangout togather!',
};
