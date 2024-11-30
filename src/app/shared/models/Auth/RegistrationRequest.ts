import { Role } from "../enums/Role";

export interface RegistrationRequest {
    email: string;
    username: string;
    fullname: string;
    password: string;
    role: Role;
}


