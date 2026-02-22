export type UserRoleApi = {
  name: string;
};

export type UserApi = {
  id: number;
  email: string;
  roles: UserRoleApi[];
  createdAt: string;
  updatedAt: string;
};

export type UserDto = {
  id: number;
  email: string;
  roleNames: string[];
  createdAt: string;
  updatedAt: string;
};

export function toUserDto(user: UserApi): UserDto {
  return {
    id: user.id,
    email: user.email,
    roleNames: user.roles.map((role) => role.name),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
