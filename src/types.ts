export interface ImageFile extends File {
  objectURL?: string
}

export interface User {
  user: UserClass
  permission: Permission
  permissions?: Permission[]
  token?: string
}

export type PermissionKey = 'canView' | 'canEdit' | 'canDelete' | 'canViewAll'

export type AccessControl = {
  permissionKey?: PermissionKey
  role?: 'user' | 'admin'
}

export interface Permission {
  canView: number
  canEdit: number
  canDelete: number
  canViewAll: number
}

export interface UserClass {
  id: number
  email: string
  role: string
}

export interface Entry {
  id: number
  userId: number
  name: string
  imagePath: string
  createdAt: string
  updatedAt: string
}
