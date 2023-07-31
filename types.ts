import * as Express from 'express';
export interface IError extends Error {
  status: number;
}
export type Ctrl = (req: Express.Request, res: Express.Response) => void;
