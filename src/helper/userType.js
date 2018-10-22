export function isSuperAdmin(user) {
    return user.userType === 'superAdmin' || user.userType === 'admin'
}

export function isStudent(user) {
    return user.userType === 'student'
}
