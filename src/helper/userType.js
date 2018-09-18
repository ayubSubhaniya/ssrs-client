export function isSuperAdmin(user) {
    return user.userType === 'superAdmin'
}

export function isStudent(user) {
    return user.userType === 'student'
}
