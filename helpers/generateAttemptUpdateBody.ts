import { IStage } from '../types';

const generateAttemptUpdateBody = <T extends keyof IStage>(
  obj: Record<string, IStage[T]>
) => {
  const resultingObject: Record<string, IStage[T]> = {};

  for (const item in obj) {
    resultingObject[`stages.$[].attempts.$[attempt].${item}` as string] =
      obj[item];
  }

  return resultingObject;
};

module.exports = generateAttemptUpdateBody;
