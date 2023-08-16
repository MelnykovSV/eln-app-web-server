const generateAttemptUpdateBody = (obj: any) => {
  const resultingObject = {} as any;

  for (const item in obj) {
    resultingObject[`stages.$[].attempts.$[attempt].${item}`] = obj[item];
  }

  return resultingObject;
};

module.exports = generateAttemptUpdateBody;
