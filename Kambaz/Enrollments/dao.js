import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const existing = db.enrollments.find(
      e => e.user === userId && e.course === courseId
    );
    
    if (existing) {
      console.log(`User ${userId} already enrolled in ${courseId}`);
      return existing;
    }
    
    const enrollment = { 
      _id: uuidv4(), 
      user: userId, 
      course: courseId 
    };

    db.enrollments.push(enrollment);
    console.log(`Enrolled user ${userId} in course ${courseId}. Total enrollments: ${db.enrollments.length}`);
    return enrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const initialLength = db.enrollments.length;

    db.enrollments = db.enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    
    console.log(`Unenrolled user ${userId} from course ${courseId}. Enrollments: ${initialLength} -> ${db.enrollments.length}`);
    return { success: true };
  }

  function findEnrollmentsForUser(userId) {
    const userEnrollments = db.enrollments.filter((enrollment) => enrollment.user === userId);
    console.log(`Found ${userEnrollments.length} enrollments for user ${userId}`);
    return userEnrollments;
  }

  function findEnrollmentsForCourse(courseId) {
    return db.enrollments.filter((enrollment) => enrollment.course === courseId);
  }

  function isUserEnrolledInCourse(userId, courseId) {
    return db.enrollments.some(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
  }

  function getAllEnrollments() {
    console.log("All enrollments in database:", db.enrollments);
    return db.enrollments;
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    isUserEnrolledInCourse,
    getAllEnrollments
  };
}