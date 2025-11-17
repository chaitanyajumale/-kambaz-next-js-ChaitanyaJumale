import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("Getting enrollments for session user:", currentUser?.username || "No user");
    
    if (!currentUser) {
      res.status(401).send("Unauthorized");
      return;
    }
    
    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.params.courseId;
    
    console.log("Enrolling user:", currentUser?.username, "in course:", courseId);
    
    if (!currentUser) {
      res.status(401).send("Unauthorized");
      return;
    }

    if (dao.isUserEnrolledInCourse(currentUser._id, courseId)) {
      res.status(400).json({ message: "Already enrolled" });
      return;
    }
    
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const courseId = req.params.courseId;
    
    console.log("Unenrolling user:", currentUser?.username, "from course:", courseId);
    
    if (!currentUser) {
      res.status(401).send("Unauthorized");
      return;
    }
    
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(204);
  };

  const getAllEnrollments = (req, res) => {
    const enrollments = dao.getAllEnrollments();
    res.json(enrollments);
  };

  app.get("/api/enrollments", findEnrollmentsForUser);
  app.post("/api/enrollments/:courseId", enrollUserInCourse);
  app.delete("/api/enrollments/:courseId", unenrollUserFromCourse);
  app.get("/api/enrollments/debug/all", getAllEnrollments); // Debug route
}