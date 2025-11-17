import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  
  const findAllCourses = () => {
    console.log(`DAO: Returning ${db.courses.length} courses`);
    return db.courses;
  };
  
  const findCourseById = (courseId) => {
    return db.courses.find((course) => course._id === courseId);
  };
  
  const createCourse = (course) => {
    const newCourse = {
      ...course,
      _id: course._id || uuidv4(),
      image: course.image || "/images/reactjs.jpg"
    };

    db.courses.push(newCourse);
    console.log(`Created course: ${newCourse.name}. Total courses: ${db.courses.length}`);
    
    return newCourse;
  };
  
  const deleteCourse = (courseId) => {
    const initialLength = db.courses.length;
    db.courses = db.courses.filter((course) => course._id !== courseId);
    db.enrollments = db.enrollments.filter((enrollment) => enrollment.course !== courseId);
    db.modules = db.modules.filter((module) => module.course !== courseId);
    db.assignments = db.assignments.filter((assignment) => assignment.course !== courseId);
    console.log(`Deleted course ${courseId}. Courses: ${initialLength} -> ${db.courses.length}`);
    
    return { success: true };
  };
  
  const updateCourse = (courseId, courseUpdates) => {
    delete courseUpdates._id;
    db.courses = db.courses.map((course) =>
      course._id === courseId ? { ...course, ...courseUpdates } : course
    );
    const updatedCourse = db.courses.find((course) => course._id === courseId);
    console.log(`Updated course: ${updatedCourse?.name}`);
    
    return updatedCourse;
  };
  const findModulesForCourse = (courseId) => {
    return db.modules.filter((module) => module.course === courseId);
  };
  
  const createModule = (moduleData) => {
    const newModule = {
      ...moduleData,
      _id: moduleData._id || uuidv4()
    };
    
    db.modules.push(newModule);
    return newModule;
  };

  const findAssignmentsForCourse = (courseId) => {
    return db.assignments.filter((assignment) => assignment.course === courseId);
  };
  
  const createAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      _id: assignment._id || uuidv4()
    };
    
    db.assignments.push(newAssignment);
    return newAssignment;
  };
  
  return {
    findAllCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    findModulesForCourse,
    createModule,
    findAssignmentsForCourse,
    createAssignment
  };
}