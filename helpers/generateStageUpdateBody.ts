
import { IStage } from "../types";
const generateStageUpdateBody = <T extends keyof IStage>(obj: Record<string, IStage[T]>) => {
  const resultingObject: Record<string, IStage[T]> = {} ;

  for (const item in obj) {
    resultingObject[`stages.$[stage].${item}` as string] = obj[item];
  }

  return resultingObject;
};

module.exports = generateStageUpdateBody;
