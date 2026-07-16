export type Status = 'live' | 'paused' | 'exited' | 'closed' | 'archived';

export interface WorkItem {
  name: string;
  url: string;
  external: boolean;
  tag?: string;
  meta: string;
  status: Status;
  description: string;
  icon?: string;
}

export const apps: WorkItem[] = [
  {
    name: 'Greyout',
    url: 'https://greyout.cc/',
    external: true,
    icon: '/logos/greyout.png',
    tag: 'macOS',
    meta: '2026',
    status: 'live',
    description:
      'A menu-bar app that greys out your screen so colour and notifications stop pulling at you. Calm tech, one keypress.',
  },
];

export const openSource: WorkItem[] = [
  {
    name: 'Gememo',
    url: 'https://github.com/caasols/gememo',
    external: true,
    icon: '/logos/gememo.png',
    meta: '2026',
    status: 'live',
    description:
      'A Chrome extension for bot-free Google Meet notes, filed to your own apps the moment you leave. No bot, no audio, no lock-in.',
  },
  {
    name: 'YouTube Scribe',
    url: 'https://github.com/caasols/raycast-youtube-scribe',
    external: true,
    icon: '/logos/raycast.png',
    meta: 'MIT',
    status: 'live',
    description:
      'Fetch, browse, and export YouTube transcripts with AI summaries, straight from Raycast.',
  },
  {
    name: 'Público',
    url: 'https://www.raycast.com/caasols/publico',
    external: true,
    icon: '/logos/raycast.png',
    meta: 'MIT',
    status: 'live',
    description:
      'Read the latest news of the Portuguese daily Público, straight from Raycast.',
  },
];

export const ventures: WorkItem[] = [
  {
    name: 'GotJazz?',
    url: 'https://waxconn.com/',
    external: true,
    icon: '/logos/gotjazz.png',
    tag: 'saas',
    meta: '2020–21',
    status: 'live',
    description:
      'Discogs × Shopify for small record shops. Started as a Python script; Waxconn bought that first version and keeps it spinning.',
  },
  {
    name: 'A Traineira',
    url: '#',
    external: false,
    icon: '/logos/traineira.png',
    tag: 'vinyl',
    meta: '2016–21',
    status: 'closed',
    description:
      'A vinyl records mail-order service and music label, for people who still drop the needle.',
  },
  {
    name: 'We Love Film',
    url: '#',
    external: false,
    icon: '/logos/wlf.png',
    tag: 'shop',
    meta: '2010–16',
    status: 'archived',
    description: 'Analogue photography e-commerce, back when film was “dead.”',
  },
];
