import {userType} from "../constants/constants";

export function isSuperAdmin(user) {
    return (user.userType ===  userType.SUPERADMIN)
}

export function isAdmin(user) {
    return (user.userType === userType.ADMIN || user.userType === userType.SUPERADMIN)
}

export function isOnlyAdmin(user) {
    return (user.userType === userType.ADMIN)
}

export function isStudent(user) {
    return (user.userType === userType.STUDENT)
}
