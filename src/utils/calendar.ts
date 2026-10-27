/**
 * Calendar helpers for Google Calendar and iCal (.ics) exports
 */

export interface WeddingEventInfo {
  id: string;
  title: string;
  description: string;
  location: string;
  startIso: string; // e.g. 20261120T150000Z
  endIso: string;   // e.g. 20261120T180000Z
  dateLabel: string;
  timeLabel: string;
}

export const WEDDING_EVENTS: WeddingEventInfo[] = [
  {
    id: 'mehndi',
    title: 'Mehndi — Mussadiq Hussain & D/o Saleem Satti',
    description: 'Pre-Wedding Festivity & Rasm Hina. Hosted by Mr. & Mrs. Sadaqat Hussain.',
    location: 'White Pearl Marquee, Company Road Banigala, Islamabad, Pakistan',
    startIso: '20261120T150000Z', // 8:00 PM PKT (UTC+5)
    endIso: '20261120T180000Z',   // 11:00 PM PKT
    dateLabel: 'Friday, 20 November 2026',
    timeLabel: 'Rasm Hina · 8:00 PM PKT'
  },
  {
    id: 'barat',
    title: 'Barat — Mussadiq Hussain & D/o Saleem Satti',
    description: 'Main Wedding Ceremony: Sehra Bandi at 5:00 PM, Departure of Barat at 7:00 PM. Hosted by Mr. & Mrs. Sadaqat Hussain.',
    location: 'White Pearl Marquee, Company Road Banigala, Islamabad, Pakistan',
    startIso: '20261121T120000Z', // 5:00 PM PKT
    endIso: '20261121T163000Z',   // 9:30 PM PKT
    dateLabel: 'Saturday, 21 November 2026',
    timeLabel: 'Sehra Bandi · 5:00 PM | Departure · 7:00 PM PKT'
  },
  {
    id: 'walima',
    title: 'Walima — Mussadiq Hussain & D/o Saleem Satti',
    description: 'Wedding Reception Dinner. Hosted by Mr. & Mrs. Sadaqat Hussain.',
    location: 'White Pearl Marquee, Company Road Banigala, Islamabad, Pakistan',
    startIso: '20261122T150000Z', // 8:00 PM PKT
    endIso: '20261122T170000Z',   // 10:00 PM PKT
    dateLabel: 'Sunday, 22 November 2026',
    timeLabel: 'Dinner · 8:00 PM – 9:30 PM PKT'
  }
];

export function createGoogleCalendarUrl(event: WeddingEventInfo): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const params = new URLSearchParams({
    text: event.title,
    dates: `${event.startIso}/${event.endIso}`,
    details: event.description,
    location: event.location,
  });
  return `${base}&${params.toString()}`;
}

export function downloadIcsFile(event: WeddingEventInfo) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mussadiq & Daughter of Saleem Satti Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-wedding-2026@whitepearl`,
    `DTSTAMP:${event.startIso}`,
    `DTSTART:${event.startIso}`,
    `DTEND:${event.endIso}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.id}-invitation.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
