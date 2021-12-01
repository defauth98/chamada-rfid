import { STATUS_KEYS, UserType } from '..';

export type FrequencyType = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  user: string;
  userInfo?: UserType;
  status: STATUS_KEYS;
  date: string;
  classroom: string;
};
