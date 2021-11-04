// User DTOs are objects that conform to data model types
export interface UsersDto {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionLevel?: number;
}
