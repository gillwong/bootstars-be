import { Router } from "express";
import { Course } from "../models/course.js";

const coursesRouter = Router();

coursesRouter.get("/", (request, response, next) => {
  Course.find({})
    .then(courses => response.json(courses))
    .catch(err => next(err));
});

coursesRouter.get("/:id", (request, response, next) => {
  Course.findById(request.params.id)
    .then(course => course 
      ? response.json(course)
      : response.status(404).end())
    .catch(err => next(err));
})

coursesRouter.get("/:code", (request, response, next) => {
  Course.find({ code: request.params.code })
    .then(courses => courses 
      ? response.json(courses)
      : response.status(404).end())
    .catch(err => next(err));
})

coursesRouter.post("", (request, response, next) => {
  let body = request.body;
  // Convert Map to Object
  // body.schedules = Object.fromEntries(body.schedules);

  const course = new Course({ ...body });
  course.save()
    .then(savedCourse => response.json(savedCourse))
    .catch(err => next(err));
})

coursesRouter.put("/:id", (request, response, next) => {
  let body = request.body;
  // Convert Map to Object
  // body.schedules = Object.fromEntries(body.schedules);

  const courseUpdate = { ...body };
  Course.findByIdAndUpdate(request.params.id, courseUpdate, { new: true, runValidators: true, context: "query" })
    .then(updatedCourse => response.json(updatedCourse))
    .catch(err => next(err));
})

coursesRouter.delete("/:id", (request, response, next) => {
  Course.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(err => next(err));
})

coursesRouter.delete("/:code", (request, response, next) => {
  Course.deleteMany({ code: request.params.code })
    .then(() => response.status(204).end())
    .catch(err => next(err));
})

export default coursesRouter;