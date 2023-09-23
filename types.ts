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

export interface ISpectr {
  label: string | null;
  spectrUrl: string;
  _id: string;
}

export interface IAttemptReagent {
  reagentNumber: 1 | 2 | 3 | 4;
  smiles: string | null;
  equivalents: number | null;
  molecularWeight: number | null;
  mass: number | null;
}

export interface IAttempt {
  attemptNumber: number;
  _id?: string | null;
  _yield: number | null;
  solvent: string | null;
  methodic: string | null;
  temp: number | null;
  time: string | null;
  notes: string | null;
  startingMaterialMass: number | null;
  productMass: number | null;
  productPurity: number | null;
  type: 'test' | 'scaling';
  isOk: boolean;
  spectra: ISpectr[];
  reagents: IAttemptReagent[];
}
export interface IStage {
  product: string | null;
  _yield: number | null;
  solvent: string | null;
  methodic: string | null;
  temp: number | null;
  time: string | null;
  _id: string;
  startingMaterial: string | null;
  testSuccess: boolean | null;
  scalingSuccess: boolean | null;
  isChanged: boolean;
  attempts: IAttempt[];
}
