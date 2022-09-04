export const STORAGE_KEY_CONSTANT = "compare_course_token"
export const USER_KEY_CONSTANT = "compare_course_user"

export const currentUser = JSON.parse(String(localStorage.getItem(USER_KEY_CONSTANT)))

export enum USER_ROLES {
  USER = "User",
  ADMIN = "Admin",
  SUPER_ADMIN = "SuperAdmin",
}

export const RoleLabel = {
  "User": "User",
  "Admin": "Company Administrator",
  "SuperAdmin": "SaaS Administrator",
}