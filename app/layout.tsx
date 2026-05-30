import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NorCal Soccer Guide — Levels, Costs, Standings, Injuries & Insoles',
    template: '%s · NorCal Soccer Guide',
  },
  description:
    'The complete guide to Northern California boys youth soccer: Rec, Select, NorCal Premier (Copper→Premier), NPL, ECNL Regional League, ECNL and MLS NEXT — expectations, costs, live standings, injury prevention by age, and how to choose Superfeet or Currex insoles.',
  keywords: [
    'NorCal soccer',
    'NorCal Premier',
    'ECNL',
    'ECNL Regional League',
    'MLS NEXT',
    'NPL',
    'youth soccer levels',
    'soccer insoles',
    'Superfeet',
    'Currex',
    'soccer injury prevention',
  ],
  authors: [{ name: 'NorCal Soccer Guide' }],
  openGraph: {
    title: 'NorCal Soccer Guide',
    description:
      'Levels, costs, standings, injury prevention and insoles for Northern California youth soccer.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
