export type Status = 'live' | 'paused' | 'exited' | 'closed' | 'archived';

export interface WorkItem {
  name: string;
  url: string;
  meta: string;
  status: Status;
  description: string;
  icon?: string;
}

export const apps: WorkItem[] = [
  {
    name: 'Greyout',
    url: 'https://greyout.cc/',
    icon: '/logos/greyout.png',
    meta: '2026',
    status: 'live',
    description:
      'A macOS menu-bar app that greys out your screen so colour and notifications stop pulling at you. Calm tech, one keypress.',
  },
];

export const openSource: WorkItem[] = [
  {
    name: 'Gememo',
    url: 'https://github.com/caasols/gememo',
    icon: '/logos/gememo.png',
    meta: '2026',
    status: 'live',
    description:
      'A Chrome extension for bot-free Google Meet notes, filed to your own apps the moment you leave. No bot, no audio, no lock-in.',
  },
  {
    name: 'YouTube Scribe',
    url: 'https://github.com/caasols/raycast-youtube-scribe',
    icon: '/logos/raycast.png',
    meta: 'MIT',
    status: 'live',
    description:
      'Fetch, browse, and export YouTube transcripts with AI summaries, straight from Raycast.',
  },
  {
    name: 'Público',
    url: 'https://www.raycast.com/caasols/publico',
    icon: '/logos/raycast.png',
    meta: 'MIT',
    status: 'live',
    description:
      'A Raycast extension that serves the latest news of the Portuguese daily Público.',
  },
];

export const ventures: WorkItem[] = [
  {
    name: 'GotJazz?',
    url: 'https://waxconn.com/',
    icon: '/logos/gotjazz.png',
    meta: '2020–21',
    status: 'live',
    description:
      'Discogs × Shopify for small record shops. Started as a Python script; Waxconn bought that first version and keeps it spinning.',
  },
  {
    name: 'A Traineira',
    url: '#',
    icon: '/logos/traineira.png',
    meta: '2016–21',
    status: 'closed',
    description:
      'A vinyl records mail-order service and music label, for people who still drop the needle.',
  },
  {
    name: 'We Love Film',
    url: '#',
    icon: '/logos/wlf.png',
    meta: '2010–16',
    status: 'archived',
    description: 'Analogue photography e-commerce, back when film was “dead.”',
  },
];
