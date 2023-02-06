import mongoose from "mongoose";

const removeIdV = returnedObj => {
  returnedObj.id = returnedObj._id.toString();
  delete returnedObj._id;
  delete returnedObj.__v;
};

const groupSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    index: true,
    required: true,
  },
  day: {
    type: String,
    enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    required: true,
  },
  time: {
    type: String,
    validate: val => /[0-9]{2}\.[0-9]{2} - [0-9]{2}\.[0-9]{2}/.test(val),
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  remark: String,
  teachingWeeks: [Number]
});

groupSchema.set("toJSON", { transform: (doc, ret) => removeIdV(ret) });

// const scheduleSchema = new mongoose.Schema({
//   index: {
//     type: String,
//     index: true,
//     unique: true,
//     required: true,
//   },
//   groups: [groupSchema]
// });

// scheduleSchema.set("toJSON", { transform: (doc, ret) => removeIdV(ret) });

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    trim: true,
    uppercase: true,
    index: true,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  au: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  grading: {
    type: String,
    enum: ["Letter-Graded", "Pass/Fail"],
    required: true
  },
  prereq: String,
  prereqNote: String,
  exclusive: String,
  programmeExclude: String,
  ayExclude: String,
  bde: {
    type: Boolean,
    default: true,
    required: true
  },
  gerpe: {
    type: Boolean,
    default: true,
    required: true
  },
  ue: {
    type: Boolean,
    default: true,
    required: true
  },
  examSchedule: {
    type: String,
    validate: val => val === "Not Applicable" || /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/.test(val),
    default: "Not Applicable",
    required: true
  },
  examDuration: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  // schedules: [scheduleSchema]
  schedules: {
    type: Map,
    of: [groupSchema]
  }
});

courseSchema.set("toJSON", { transform: (doc, ret) => removeIdV(ret) });

export const Group = mongoose.model("Group", groupSchema);
// export const Schedule = mongoose.model("Schedule", scheduleSchema);
export const Course = mongoose.model("Course", courseSchema);
