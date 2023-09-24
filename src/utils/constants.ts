export const STORAGE_KEY_CONSTANT = "compare_course_token"
export const USER_KEY_CONSTANT = "compare_course_user"
export const REVIEW_KEY_CONSTANT = "compare_course_review_form"

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

export const tagColors = [
  "#CBF3F0",
  "#f2e2ba",
  "#F8AD9D"
]

export const getAvatarUrl = (name: string) =>
    `https://avatars.dicebear.com/api/avataaars/${name}.svg?mood[]=happy&background=%233867d6`;