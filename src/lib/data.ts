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
    "id": "user-1719525601",
    "name": "Segun Ademolu",
    "phone": "+1 (510) 953-9096",
    "profilePicture": "https://picsum.photos/seed/1719525601/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 5, "day": 25 },
    "isAdmin": false
  },
  {
    "id": "user-1719525602",
    "name": "Bro Fola",
    "phone": "+234 703 088 3287",
    "profilePicture": "https://picsum.photos/seed/1719525602/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 10 },
    "isAdmin": false
  },
  {
    "id": "user-1719525603",
    "name": "Bro Bamidele Olowa",
    "phone": "9255226914",
    "profilePicture": "https://picsum.photos/seed/1719525603/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 13 },
    "isAdmin": false
  },
  {
    "id": "user-1719525604",
    "name": "Dare Aluko",
    "phone": "+1 (925) 528-6163",
    "profilePicture": "https://picsum.photos/seed/1719525604/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 9, "day": 23 },
    "isAdmin": false
  },
  {
    "id": "user-1719525605",
    "name": "Bro Steve",
    "phone": "+1 (925) 752-5992",
    "profilePicture": "https://picsum.photos/seed/1719525605/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 24 },
    "isAdmin": false
  },
  {
    "id": "user-1719525606",
    "name": "Kehinde Onakoya",
    "phone": "+1 (925) 435-2792",
    "profilePicture": "https://picsum.photos/seed/1719525606/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 3, "day": 27 },
    "isAdmin": false
  },
  {
    "id": "user-1719525607",
    "name": "Doyin Ogunlana",
    "phone": "+1 (925) 595-2574",
    "profilePicture": "https://picsum.photos/seed/1719525607/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 1, "day": 1 },
    "isAdmin": false
  },
  {
    "id": "user-1719525608",
    "name": "Tokunbo George",
    "phone": "9255485589",
    "profilePicture": "https://picsum.photos/seed/1719525608/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 21 },
    "isAdmin": false
  },
  {
    "id": "user-1719525609",
    "name": "Gbenga Adesina",
    "phone": "+1 (925) 206-1317",
    "profilePicture": "https://picsum.photos/seed/1719525609/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 7, "day": 23 },
    "isAdmin": false
  },
  {
    "id": "user-1719525610",
    "name": "Siji Okeowo",
    "phone": "+1 (303) 885-2649",
    "profilePicture": "https://picsum.photos/seed/1719525610/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 7, "day": 29 },
    "isAdmin": false
  },
  {
    "id": "user-1719525611",
    "name": "Deacon Echendu",
    "phone": "+1 (925) 407-5047",
    "profilePicture": "https://picsum.photos/seed/1719525611/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 9, "day": 13 },
    "isAdmin": false
  },
  {
    "id": "user-1719525612",
    "name": "Kunle Adeyelu",
    "phone": "+1 4157942376",
    "profilePicture": "https://picsum.photos/seed/1719525612/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 5, "day": 19 },
    "isAdmin": false
  },
  {
    "id": "user-1719525613",
    "name": "Anthony Ogoh",
    "phone": "+1 (925) 329-8318",
    "profilePicture": "https://picsum.photos/seed/1719525613/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 10, "day": 10 },
    "isAdmin": false
  },
  {
    "id": "user-1719525614",
    "name": "Labo Oyaronmu",
    "phone": "+1 (510) 246-6906",
    "profilePicture": "https://picsum.photos/seed/1719525614/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 8, "day": 12 },
    "isAdmin": false
  },
  {
    "id": "user-1719525615",
    "name": "Odunayo Ogunbameru",
    "phone": "+1 (415) 244-7880",
    "profilePicture": "https://picsum.photos/seed/1719525615/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 12, "day": 13 },
    "isAdmin": false
  },
  {
    "id": "user-1719525616",
    "name": "Olaoye Akinyemi",
    "phone": "+1 (415) 530-0337",
    "profilePicture": "https://picsum.photos/seed/1719525616/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 2, "day": 6 },
    "isAdmin": false
  },
  {
    "id": "user-1719525617",
    "name": "Bayo Akintunde",
    "phone": "+1 (917) 724-4180",
    "profilePicture": "https://picsum.photos/seed/1719525617/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 5, "day": 20 },
    "isAdmin": false
  },
  {
    "id": "user-1719525618",
    "name": "Prince Ibe",
    "phone": "9252371833",
    "profilePicture": "https://picsum.photos/seed/1719525618/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 3, "day": 19 },
    "isAdmin": false
  },
  {
    "id": "user-1719525619",
    "name": "Adeola Alade",
    "phone": "9258135393",
    "profilePicture": "https://picsum.photos/seed/1719525619/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 1, "day": 4 },
    "isAdmin": false
  },
  {
    "id": "user-1719525620",
    "name": "Seye Ogini",
    "phone": "+1 (415) 425-8215",
    "profilePicture": "https://picsum.photos/seed/1719525620/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 3 },
    "isAdmin": false
  },
  {
    "id": "user-1719525621",
    "name": "Bro Leke",
    "phone": "+1 (510) 827-6018",
    "profilePicture": "https://picsum.photos/seed/1719525621/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 5, "day": 1 },
    "isAdmin": false
  },
  {
    "id": "user-1719525622",
    "name": "Emmanuel Adebileje",
    "phone": "+1 (415) 583-1611",
    "profilePicture": "https://picsum.photos/seed/1719525622/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 9, "day": 9 },
    "isAdmin": false
  },
  {
    "id": "user-1719525623",
    "name": "Jide Kaka",
    "phone": "+1 (925) 984-9245",
    "profilePicture": "https://picsum.photos/seed/1719525623/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 12, "day": 4 },
    "isAdmin": false
  },
  {
    "id": "user-1719525624",
    "name": "Prince Abiodun Adebayo",
    "phone": "+1 (614) 772-4999",
    "profilePicture": "https://picsum.photos/seed/1719525624/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 12, "day": 25 },
    "isAdmin": false
  },
  {
    "id": "user-1719525625",
    "name": "Dr. Alfred Ojobaro",
    "phone": "+1 (708) 631-8471",
    "profilePicture": "https://picsum.photos/seed/1719525625/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 9, "day": 28 },
    "isAdmin": false
  },
  {
    "id": "user-1719525626",
    "name": "Pastor Kayode Daniels",
    "phone": "+1 (925) 378-8342",
    "profilePicture": "https://picsum.photos/seed/1719525626/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 12, "day": 26 },
    "isAdmin": false
  },
  {
    "id": "user-1719525627",
    "name": "Pastor Yemi Oyinkansola",
    "phone": "+1 (510) 258-4583",
    "profilePicture": "https://picsum.photos/seed/1719525627/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 11, "day": 14 },
    "isAdmin": false
  },
  {
    "id": "user-1719525628",
    "name": "Bestman O Ndubuisi",
    "phone": "+1 (925) 628-9610",
    "profilePicture": "https://picsum.photos/seed/1719525628/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 8, "day": 28 },
    "isAdmin": false
  },
  {
    "id": "user-1719525629",
    "name": "Deacon Olusoga Odufalu",
    "phone": "+1 (925) 699-5312",
    "profilePicture": "https://picsum.photos/seed/1719525629/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 19 },
    "isAdmin": false
  },
  {
    "id": "user-1719525630",
    "name": "Leye David Babawale",
    "phone": "+1 (917) 600-4754",
    "profilePicture": "https://picsum.photos/seed/1719525630/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 14 },
    "isAdmin": false
  },
  {
    "id": "user-1719525631",
    "name": "Yves, Eteti",
    "phone": "5101234517",
    "profilePicture": "https://picsum.photos/seed/1719525631/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 30 },
    "isAdmin": false
  },
  {
    "id": "user-1719525632",
    "name": "Ubedu, Joseph",
    "phone": "5101234516",
    "profilePicture": "https://picsum.photos/seed/1719525632/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 8, "day": 2 },
    "isAdmin": false
  },
  {
    "id": "user-1719525633",
    "name": "Bro, Chika",
    "phone": "5101234506",
    "profilePicture": "https://picsum.photos/seed/1719525633/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 21 },
    "isAdmin": false
  },
  {
    "id": "user-1719525634",
    "name": "Tiwalolu, Adebote",
    "phone": "5101234515",
    "profilePicture": "https://picsum.photos/seed/1719525634/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 10, "day": 30 },
    "isAdmin": false
  },
  {
    "id": "user-1719525635",
    "name": "Sola, Soneye",
    "phone": "5101234512",
    "profilePicture": "https://picsum.photos/seed/1719525635/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 1, "day": 8 },
    "isAdmin": false
  },
  {
    "id": "user-1719525636",
    "name": "Suo, Adidi",
    "phone": "530-364-7041",
    "profilePicture": "https://picsum.photos/seed/1719525636/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 8, "day": 7 },
    "isAdmin": false
  },
  {
    "id": "user-1719525637",
    "name": "Nick, Agbo",
    "phone": "5101234510",
    "profilePicture": "https://picsum.photos/seed/1719525637/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 11 },
    "isAdmin": false
  },
  {
    "id": "user-1719525638",
    "name": "Teddy, Chilaka",
    "phone": "5101234514",
    "profilePicture": "https://picsum.photos/seed/1719525638/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 6 },
    "isAdmin": false
  },
  {
    "id": "user-1719525639",
    "name": "Paul, Ude",
    "phone": "5101234518",
    "profilePicture": "https://picsum.photos/seed/1719525639/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 16 },
    "isAdmin": false
  },
  {
    "id": "user-1719525640",
    "name": "Anselme, Dah-Touhouenou",
    "phone": "5101234504",
    "profilePicture": "https://picsum.photos/seed/1719525640/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 21 },
    "isAdmin": false
  },
  {
    "id": "user-1719525641",
    "name": "Akra, Victor",
    "phone": "5101234503",
    "profilePicture": "https://picsum.photos/seed/1719525641/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 3, "day": 30 },
    "isAdmin": false
  },
  {
    "id": "user-1719525642",
    "name": "Adebowale, Kolade",
    "phone": "5101234502",
    "profilePicture": "https://picsum.photos/seed/1719525642/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 11 },
    "isAdmin": false
  },
  {
    "id": "user-1719525643",
    "name": "Adedeji, Azeez Oyebade",
    "phone": "5101234501",
    "profilePicture": "https://picsum.photos/seed/1719525643/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 7, "day": 30 },
    "isAdmin": false
  },
  {
    "id": "user-1719525644",
    "name": "Philip, Dika",
    "phone": "5101234511",
    "profilePicture": "https://picsum.photos/seed/1719525644/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 17 },
    "isAdmin": false
  },
  {
    "id": "user-1719525645",
    "name": "Monday, Udoh",
    "phone": "5101234509",
    "profilePicture": "https://picsum.photos/seed/1719525645/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 8, "day": 15 },
    "isAdmin": false
  },
  {
    "id": "user-1719525646",
    "name": "Kelvin, Oghogh",
    "phone": "5101234508",
    "profilePicture": "https://picsum.photos/seed/1719525646/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 5, "day": 28 },
    "isAdmin": false
  },
  {
    "id": "user-1719525647",
    "name": "Friday, Edia",
    "phone": "5101234507",
    "profilePicture": "https://picsum.photos/seed/1719525647/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 2, "day": 15 },
    "isAdmin": false
  },
  {
    "id": "user-1719525648",
    "name": "Bidemi, Kareem",
    "phone": "5101234505",
    "profilePicture": "https://picsum.photos/seed/1719525648/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 9, "day": 21 },
    "isAdmin": false
  },
  {
    "id": "user-1719525649",
    "name": "Festus Onyejiekwe",
    "phone": "+1 (510) 674-4215",
    "profilePicture": "https://picsum.photos/seed/1719525649/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 2, "day": 6 },
    "isAdmin": false
  },
  {
    "id": "user-1719525650",
    "name": "Daniel Odegbami",
    "phone": "+1 (510) 688-8467",
    "profilePicture": "https://picsum.photos/seed/1719525650/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 5 },
    "isAdmin": false
  },
  {
    "id": "user-1719525651",
    "name": "Bro Chika",
    "phone": "+1 (628) 233-1722",
    "profilePicture": "https://picsum.photos/seed/1719525651/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 6, "day": 5 },
    "isAdmin": false
  },
  {
    "id": "user-1719525652",
    "name": "Bola Olatunji",
    "phone": "9254343862",
    "profilePicture": "https://picsum.photos/seed/1719525652/200/200",
    "profileDetails": "A new member of the community.",
    "birthday": { "month": 4, "day": 3 },
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
