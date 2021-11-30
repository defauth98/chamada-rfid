import { STATUS_KEYS } from "..";

export type CourseType = {
    _id?: string,
    createdAt?:string,
    updatedAt?:string,
    name:string,
    description?:string,
    addiontalInfo?:string,
    status: STATUS_KEYS
} 