export interface Worker {
    id:                    number;
    user:                  User;
    category:              Category;
    experienceDescription: string;
    hourlyRate:            number;
    projectsCompleted:     number;
    rating:                number;
    reviews:               any[];
    services:              Service[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Service {
    id:          number;
    workerId:    number;
    serviceName: string;
    price:       number;
    description: string;
    imageUrl:    string;
}

export interface User {
    firstName:      string;
    lastName:       string;
    email:          string;
    password:       string;
    role:           Role;
    age:            number;
    dni:            string;
    profilePicture: string;
}

export enum Role {
    Worker = "worker",
    Customer = "customer",
}

export interface Alert {
  id: number;
  userId: string;
  type: 'system' | 'user';
  systemName?: string;
  logoUrl?: string;
  message: string;
  timestamp?: string;
  date?: string;
  read: boolean;
  link: string;
  username?: string;
  avatarUrl?: string;
  workerAvatarUrl?: string;
  workerName?: string;
}
