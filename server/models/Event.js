const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: createstamp => dateFormat(createstamp)
    },
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

eventSchema.pre('save', async function(next) {
  if (this.isNew) {
    const newDate = new Date(this.date);
    this.date = await new Intl.DateTimeFormat('en-US').format(newDate);
  }
  next();
});

eventSchema.pre('save', async function(next) {
  if (this.isNew) {
    const newTime = this.time;
    const splitTime= newTime.split(':');
    const hours = splitTime[0];
    const minutes = splitTime[1];

    this.time = ((hours > 12) ? (hours - 12) : hours) + ':' + minutes + ((hours >= 12) ? 'P.M.' : 'A.M.');
  }
  next();
});

eventSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

eventSchema.virtual('attendanceCount').get(function () {
  return this.attendees.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;
