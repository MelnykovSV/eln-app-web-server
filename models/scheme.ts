const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/index');

const defaultAttempt = {
  attemptNumber: 1,
  _id: null,
  _yield: null,
  solvent: null,
  methodic: null,
  temp: null,
  time: null,
  notes: null,
  startingMaterialMass: null,
  productMass: null,
  productPurity: null,
  type: 'test',
  isOk: false,
  spectra: [],
  reagents: [
    {
      reagentNumber: 1,
      smiles: null,
      equivalents: null,
      molecularWeight: null,
      mass: null,
    },
    {
      reagentNumber: 2,
      smiles: null,
      equivalents: null,
      molecularWeight: null,
      mass: null,
    },
    {
      reagentNumber: 3,
      smiles: null,
      equivalents: null,
      molecularWeight: null,
      mass: null,
    },
    {
      reagentNumber: 4,
      smiles: null,
      equivalents: null,
      molecularWeight: null,
      mass: null,
    },
  ],
};

const spectrSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  spectrUrl: {
    type: String,
    required: true,
  },
});
const attemptReagentSchema = new Schema({
  reagentNumber: {
    type: Number,
    default: 1,
  },
  smiles: {
    type: String,
    default: null,
  },
  equivalents: {
    type: Number,
    default: null,
  },
  molecularWeight: {
    type: Number,
    default: null,
  },
  mass: {
    type: Number,
    default: null,
  },
});
const attemptSchema = new Schema(
  {
    attemptNumber: {
      type: Number,
      default: 1,
    },
    temp: {
      type: Number,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    methodic: {
      type: String,
      default: null,
    },
    solvent: {
      type: String,
      default: null,
    },
    _yield: {
      type: Number,
      default: null,
    },
    reagents: {
      type: [attemptReagentSchema],
    },
    spectra: {
      type: [spectrSchema],
    },

    startingMaterialMass: {
      type: Number,
      default: null,
    },
    productMass: {
      type: Number,
      default: null,
    },

    productPurity: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      enum: ['test', 'scaling'],
      default: 'test',
    },
    isOk: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const stageSchema = new Schema(
  {
    startingMaterial: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    methodic: {
      type: String,
      default: '',
    },

    temp: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    _yield: {
      type: Number,
      default: null,
    },
    solvent: {
      type: String,
      default: '',
    },

    testSuccess: {
      type: Boolean,
      default: false,
    },
    scalingSuccess: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: [attemptSchema],
      default: [defaultAttempt],
    },
  },
  { versionKey: false, timestamps: true }
);

const schemeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'success', 'fail', 'chosen'],
      default: 'active',
    },

    mass: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      // default: new Date(),
    },
    startingMaterial: {
      type: String,
      required: true,
    },
    targetCompound: {
      type: String,
      required: true,
    },
    stages: {
      type: [stageSchema],
      required: true,
    },
    stagesNumber: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

schemeSchema.post('save', handleMongooseError);
const Scheme = model('scheme', schemeSchema);
module.exports = {
  Scheme,
};

export {};
