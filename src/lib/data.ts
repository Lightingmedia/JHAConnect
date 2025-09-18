import type { User, Post } from './types';

// This file will be overwritten by the XLS upload feature.
// Do not edit it manually if you intend to use the upload feature.

export let communityUsers: User[] = [
  {
    "id": "1",
    "name": "JHA",
    "phone": "1234567890",
    "profilePicture": "https://storage.googleapis.com/aifirebase-demo-images/jha-connect-profile-1.png",
    "profileDetails": "Loves hiking and photography. Been a member for 5 years.",
    "birthday": { "month": 7, "day": 19 },
    "isAdmin": true
  },
  {
    "id": "2",
    "name": "Jane Doe",
    "phone": "0987654321",
    "profilePicture": "https://storage.googleapis.com/aifirebase-demo-images/jha-connect-profile-2.png",
    "profileDetails": "A passionate baker and dog lover.",
    "birthday": { "month": 7, "day": 21 },
    "isAdmin": false
  },
  {
    "id": "3",
    "name": "John Smith",
    "phone": "1122334455",
    "profilePicture": "https://storage.googleapis.com/aifirebase-demo-images/jha-connect-profile-3.png",
    "profileDetails": "Enjoys playing the guitar and volunteering.",
    "birthday": { "month": 7, "day": 15 },
    "isAdmin": false
  },
  {
    "id": "4",
    "name": "Emily White",
    "phone": "5566778899",
    "profilePicture": "https://storage.googleapis.com/aifirebase-demo-images/jha-connect-profile-4.png",
    "profileDetails": "Travel enthusiast and foodie.",
    "birthday": { "month": 8, "day": 22 },
    "isAdmin": false
  },
  {
    "id": "5",
    "name": "Michael Brown",
    "phone": "9988776655",
    "profilePicture": "https://storage.googleapis.com/aifirebase-demo-images/jha-connect-profile-5.png",
    "profileDetails": "A tech geek and movie buff.",
    "birthday": { "month": 12, "day": 1 },
    "isAdmin": false
  },
  {
    "id": "6",
    "name": "Admin User",
    "phone": "9254343862",
    "profilePicture": "https://storage.googleapis.com/aifirebase-demo-images/jha-connect-profile-6.png",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 1, "day": 1 },
    "isAdmin": true
  }
];

export let communityPosts: Post[] = [
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

// This function is used by the upload action to overwrite the data in this file.
export function __dangerously_set_community_users(users: User[]) {
    communityUsers = users;
}
