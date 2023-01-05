import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Course, Group } from "./models/course.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());


app.get("/api/courses", (request, response, next) => {
  Course.find({})
    .then(courses => response.json(courses))
    .catch(err => next(err));
});

app.get("/api/courses/:id", (request, response, next) => {
  Course.findById(request.params.id)
    .then(course => course 
      ? response.json(course)
      : response.status(404).end())
    .catch(err => next(err));
})

app.get("/api/courses/:code", (request, response, next) => {
  Course.find({ code: request.params.code })
    .then(courses => courses 
      ? response.json(courses)
      : response.status(404).end())
    .catch(err => next(err));
})

app.post("/api/courses", (request, response, next) => {
  let body = request.body;
  // Convert Map to Object
  // body.schedules = Object.fromEntries(body.schedules);

  const course = new Course({ ...body });
  course.save()
    .then(savedCourse => response.json(savedCourse))
    .catch(err => next(err));
})

app.put("/api/courses/:id", (request, response, next) => {
  let body = request.body;
  // Convert Map to Object
  // body.schedules = Object.fromEntries(body.schedules);

  const courseUpdate = { ...body };
  Course.findByIdAndUpdate(request.params.id, courseUpdate, { new: true, runValidators: true, context: "query" })
    .then(updatedCourse => response.json(updatedCourse))
    .catch(err => next(err));
})

app.delete("/api/courses/:id", (request, response, next) => {
  Course.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(err => next(err));
})

app.delete("/api/courses/:code", (request, response, next) => {
  Course.deleteMany({ code: request.params.code })
    .then(() => response.status(204).end())
    .catch(err => next(err));
})

const PORT = process.env.PORT || 8080
app.listen(PORT);
console.log(`Server running on ${PORT}`);
