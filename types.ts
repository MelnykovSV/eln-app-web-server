import * as Express from 'express';
import { Schema } from 'mongoose';
export interface IError extends Error {
  status: number;
}
export type Ctrl = (req: Express.Request, res: Express.Response) => void;

export interface IUser {
  _id: Schema.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  verify: boolean;
  verificationCode: string;
  avatarURL: string;
}

export interface IExtendedRequest extends Express.Request {
  user: IUser;
}

export type IFileNameCallback = (error: Error | null, filename: string) => void;
