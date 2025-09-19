export interface User {
  id: string;
  name: string;
  phone: string;
  profilePicture: string;
  profileDetails: string;
  birthday: {
    month: number; // 1-12
    day: number;
  };
  isAdmin?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: string[]; // array of user IDs
}

export interface Member {
    name: string;
    dob: string | null;
    phone: string | null;
}
