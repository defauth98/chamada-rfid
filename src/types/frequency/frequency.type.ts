import { STATUS_KEYS } from "..";

export type FrequencyType = {
    _id?: string,
    createdAt?:string,
    updatedAt?:string,
    user:string,
    status: STATUS_KEYS,
    date:string,
    classroom: string,
}