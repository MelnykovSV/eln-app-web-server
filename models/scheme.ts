const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/index');
const Joi = require('joi');

// const {
//   userNameRegexp,
//   passwordRegexp,
//   emailRegexp,
// } = require('./../regexp/index');
const attemptSchema = new Schema(
  {
    temp: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    methodic: {
      type: String,
      default: '',
    },
    solvent: {
      type: String,
      default: '',
    },
    _yield: {
      type: Number,
      default: 0,
    },
    reagents: {
      type: [],
      default: [],
    },
    spectra: {
      type: [String],
      default: [],
    },

    smMass: {
      type: Number,
      default: 0,
    },
    smPurity: {
      type: Number,
      default: 0,
    },
    purity: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['test', 'scaling'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'success', 'fail'],
      required: true,
    },
    notes: {
      type: String,
      default: '',
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
      default: [],
    },
    fractionsSummary: {
      type: [],
      default: [],
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
      enum: ['active', 'success', 'fail'],
      default: 'active',
    },

    mass: {
      type: Number,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      default: 'none',
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
  },
  { versionKey: false, timestamps: true }
);

schemeSchema.post('save', handleMongooseError);
const Scheme = model('scheme', schemeSchema);
module.exports = {
  Scheme,
};

export {};
