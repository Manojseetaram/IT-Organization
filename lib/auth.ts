// export interface User {
//   id: string
//   email: string
//   role: "admin" | "superadmin"
// }

// export interface SuperAdmin {
//   id: string
//   email: string
//   superadminId: string
//   orgId: string
//   createdAt: string
// }

// // Local storage keys
// const AUTH_USER_KEY = "auth_user"
// const SUPER_ADMINS_KEY = "super_admins"

// // Authentication functions
// export const saveUser = (user: User) => {
//   localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
// }

// export const getUser = (): User | null => {
//   if (typeof window === "undefined") return null
//   const user = localStorage.getItem(AUTH_USER_KEY)
//   return user ? JSON.parse(user) : null
// }

// export const removeUser = () => {
//   localStorage.removeItem(AUTH_USER_KEY)
// }

// // Super admin management
// export const saveSuperAdmin = (superAdmin: SuperAdmin) => {
//   const existing = getSuperAdmins()
//   const updated = [...existing, superAdmin]
//   localStorage.setItem(SUPER_ADMINS_KEY, JSON.stringify(updated))
// }

// export const getSuperAdmins = (): SuperAdmin[] => {
//   if (typeof window === "undefined") return []
//   const admins = localStorage.getItem(SUPER_ADMINS_KEY)
//   return admins ? JSON.parse(admins) : []
// }

// // Mock authentication
// export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
//   // Mock authentication - in real app, this would be an API call
//   if (email === "admin@example.com" && password === "password") {
//     const user: User = {
//       id: "1",
//       email,
//       role: "admin",
//     }
//     saveUser(user)
//     return user
//   }
//   return null
// }
export interface User {
  id: string
  email: string
  role: "admin" | "superadmin"
}

export interface SuperAdmin {
  id: string
  email: string
  superadminId: string
  orgId: string
  createdAt: string
}

// Local storage keys
const AUTH_USER_KEY = "auth_user"
const SUPER_ADMINS_KEY = "super_admins"

// Authentication functions
export const saveUser = (user: User) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(AUTH_USER_KEY)
  return user ? JSON.parse(user) : null
}

export const removeUser = () => {
  localStorage.removeItem(AUTH_USER_KEY)
}

// Super admin management
export const saveSuperAdmin = (superAdmin: SuperAdmin) => {
  const existing = getSuperAdmins()
  const updated = [...existing, superAdmin]
  localStorage.setItem(SUPER_ADMINS_KEY, JSON.stringify(updated))
}

export const getSuperAdmins = (): SuperAdmin[] => {
  if (typeof window === "undefined") return []
  const admins = localStorage.getItem(SUPER_ADMINS_KEY)
  return admins ? JSON.parse(admins) : []
}

// ✅ Mock authentication that accepts ANY email/password
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // In a real app, this would be an API call
  if (!email || !password) {
    return null
  }

  // Assign "superadmin" role if email contains "superadmin", otherwise "admin"
  const role: "admin" | "superadmin" = email.includes("superadmin") ? "superadmin" : "admin"

  const user: User = {
    id: Date.now().toString(), // simple unique id
    email,
    role,
  }

  saveUser(user)
  return user
}
