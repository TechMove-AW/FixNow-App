export interface Alert {
  id:          number;
  userId:      number;
  type:        string;
  systemName?: string;
  date:        string;
  logoUrl?:    string;
  message:     string;
  timestamp:   Date;
  read:        boolean;
  link:        string;
  sender:      Sender | null;
}

export interface Sender {
  userId:         number;
  firstName:      string;
  lastName:       string;
  profilePicture: string;
}

export interface Category {
  id:   number;
  name: string;
  slug: string;
}

export interface Review {
  id:       number;
  workerId: number;
  userId:   number;
  rating:   number;
  comment:  string;
  date:     Date;
}

export interface WorkerService {
  id:          number;
  workerId:    number;
  serviceName: string;
  price:       number;
  description: string;
  imageUrl:    string;
}

export interface Worker {
  id:                    number;
  user:                  User;
  category:              Category;
  experienceDescription: string;
  hourlyRate:            number;
  projectsCompleted:     number;
  rating:                number;
  reviewIds:             number[];
  serviceIds:            number[];
}

export interface User {
  id:             number;
  firstName:      string;
  lastName:       string;
  email:          string;
  role:           string;
  age:            number;
  dni:            string;
  profilePicture: string;
  location:       Location;
}

export interface Location {
  display_name: string;
  latitude:     number;
  longitude:    number;
}
