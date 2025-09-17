import { User, Post } from './types';

export const adminPhoneNumbers: string[] = ['1234567890'];

export const communityUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    phone: '1234567890',
    profilePicture: 'https://picsum.photos/seed/1/200/200',
    profileDetails: 'Loves hiking and photography. Been a member for 5 years.',
    birthday: { month: new Date().getMonth() + 1, day: new Date().getDate() },
    isAdmin: true,
  },
  {
    id: '2',
    name: 'Jane Doe',
    phone: '0987654321',
    profilePicture: 'https://picsum.photos/seed/2/200/200',
    profileDetails: 'A passionate baker and dog lover.',
    birthday: { month: new Date().getMonth() + 1, day: new Date().getDate() + 2 },
  },
  {
    id: '3',
    name: 'John Smith',
    phone: '1122334455',
    profilePicture: 'https://picsum.photos/seed/3/200/200',
    profileDetails: 'Enjoys playing the guitar and volunteering.',
    birthday: { month: 7, day: 15 },
  },
  {
    id: '4',
    name: 'Emily White',
    phone: '5566778899',
    profilePicture: 'https://picsum.photos/seed/4/200/200',
    profileDetails: 'Travel enthusiast and foodie.',
    birthday: { month: 8, day: 22 },
  },
  {
    id: '5',
    name: 'Michael Brown',
    phone: '9988776655',
    profilePicture: 'https://picsum.photos/seed/5/200/200',
    profileDetails: 'A tech geek and movie buff.',
    birthday: { month: 12, day: 1 },
  },
];

export const communityPosts: Post[] = [
  {
    id: 'post1',
    userId: '2',
    content: 'Just baked a fresh batch of sourdough! The kitchen smells amazing. 🍞',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: ['3', '4'],
  },
  {
    id: 'post2',
    userId: '4',
    content: 'Planning my next trip! Any recommendations for Southeast Asia? 🌏',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: ['1', '2', '5'],
  },
  {
    id: 'post3',
    userId: '3',
    content: 'Had a great time volunteering at the local shelter today. So many sweet animals need a home. ❤️',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: [],
  },
];
