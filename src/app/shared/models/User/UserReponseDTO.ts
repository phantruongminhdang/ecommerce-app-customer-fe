export interface UserResponseDTO {
    email: string;
    fullname: string | null;
    id: string;
    isLockout: boolean;
    role: string;
    userName: string;
}
