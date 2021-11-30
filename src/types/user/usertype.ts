import { CourseRefType, MAJOR_KEYS, ROLES_KEYS, STATUS_KEYS } from ".."

export type UserType = {
    _id?: string,
    classrooms?: ClassroomRefType[],
    courses?: CourseRefType[],
    cpf?: string
    createdAt?:string,
    major: MAJOR_KEYS,
    password: string,
    ra: string,
    role: ROLES_KEYS,
    updatedAt?:string,
    rfid: string,
    name: string,
}

export type ClassroomRefType = {
    _id?:string,
    createdAt?:string,
    room: string,
    status: STATUS_KEYS,
    updatedAt?:string,
} 