import CoursesDao from "./dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);

  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    console.log(`Returning ${courses.length} courses to client`);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("Create course attempt by:", currentUser?.username, "Role:", currentUser?.role);
    
    if (!currentUser) {
      res.status(401).json({ message: "Must be logged in" });
      return;
    }
    
    if (currentUser.role !== "FACULTY") {
      res.status(403).json({ message: "Only faculty can create courses" });
      return;
    }
    
    const course = {
      ...req.body,
      _id: Date.now().toString()
    };
    
    const newCourse = dao.createCourse(course);
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.params.courseId;
    
    console.log("Delete course attempt by:", currentUser?.username, "Course:", courseId);
    
    if (!currentUser) {
      res.status(401).json({ message: "Must be logged in" });
      return;
    }
    
    if (currentUser.role !== "FACULTY") {
      res.status(403).json({ message: "Only faculty can delete courses" });
      return;
    }
    
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  };

  const updateCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.params.courseId;
    const courseUpdates = req.body;
    
    console.log("Update course attempt by:", currentUser?.username, "Course:", courseId);
    
    if (!currentUser) {
      res.status(401).json({ message: "Must be logged in" });
      return;
    }
    
    if (currentUser.role !== "FACULTY") {
      res.status(403).json({ message: "Only faculty can update courses" });
      return;
    }
    
    const updatedCourse = dao.updateCourse(courseId, courseUpdates);
    res.json(updatedCourse);
  };

  const findCourseById = (req, res) => {
    const courseId = req.params.courseId;
    const course = dao.findCourseById(courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  };

  const findModulesForCourse = (req, res) => {
    const courseId = req.params.courseId;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };
  
  const createModule = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.params.courseId;
    
    if (!currentUser || currentUser.role !== "FACULTY") {
      res.status(403).json({ message: "Only faculty can create modules" });
      return;
    }
    
    const moduleData = {
      ...req.body,
      course: courseId,
      _id: Date.now().toString()
    };
    
    const newModule = dao.createModule(moduleData);
    res.json(newModule);
  };

  const findAssignmentsForCourse = (req, res) => {
    const courseId = req.params.courseId;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };
  
  const createAssignment = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.params.courseId;
    
    if (!currentUser || currentUser.role !== "FACULTY") {
      res.status(403).json({ message: "Only faculty can create assignments" });
      return;
    }
    
    const assignment = {
      ...req.body,
      course: courseId,
      _id: Date.now().toString()
    };
    
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
}