const schemeExampleBody = {
  mass: 30,
  price: 'N100',
  startingMaterial: 'N#CC1=CC=CC=C1',
  targetCompound: 'C1(C2=NCCN2)=CC=CC=C1',

  stages: [
    {
      startingMaterial: 'N#CC1=CC=CC=C1',
      product: 'N/C(C1=CC=CC=C1)=NO',
      methodic: 'R1/H2O reflux overnight',
      temp: '85',
      time: '16h',
      solvent: 'R1/H2O',
    },
    {
      startingMaterial: 'N/C(C1=CC=CC=C1)=NO',
      product: 'NC(C1=CC=CC=C1)=N',
      methodic: 'Reduction in aucoclave, 5 atm, rt, overnight',
      temp: 'rt',
      time: '16h',
      solvent: 'R1',
    },
    {
      startingMaterial: 'NC(C1=CC=CC=C1)=N',
      product: 'C1(C2=NCCN2)=CC=CC=C1',
      methodic: 'Reflux in R1 overnight',
      temp: '85',
      time: '16h',
      solvent: 'R1',
    },
  ],
};

const attemptBodyExample = {
  dbId: 'sg001',
  temp: '70deg',
  time: '6h',
  methodic: 'refluxed 6 hours in R1/H20',
  solvent: 'R1/H20',
  smMass: 1,
  smPurity: 95,
  type: 'test',
  notes: 'some random notes',
};
