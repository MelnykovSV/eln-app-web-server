const generateStageUpdateBody = (obj: any) => {
  const resultingObject = {} as any;

  for (const item in obj) {
    resultingObject[`stages.$[stage].${item}`] = obj[item];
  }

  return resultingObject;
};

module.exports = generateStageUpdateBody;
