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