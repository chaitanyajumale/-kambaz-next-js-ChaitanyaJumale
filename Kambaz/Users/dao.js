import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const createUser = (user) => {

    const newUser = { 
      ...user, 
      _id: user._id || uuidv4() 
    };
    db.users = [...db.users, newUser];
    return newUser;
  };
  
  const findAllUsers = () => db.users;
  
  const findUserById = (userId) => db.users.find((user) => user._id === userId);
  
  const findUserByUsername = (username) => db.users.find((user) => user.username === username);
  
  const findUserByCredentials = (username, password) =>
    db.users.find((user) => user.username === username && user.password === password);
  
  const updateUser = (userId, userUpdates) => {
    delete userUpdates._id;
    
    db.users = db.users.map((u) => 
      u._id === userId ? { ...u, ...userUpdates } : u
    );

    return db.users.find((u) => u._id === userId);
  };
  
  const deleteUser = (userId) => {
    db.users = db.users.filter((u) => u._id !== userId);
  };
  
  const findCoursesForUser = (userId) => {
    const enrollments = db.enrollments.filter((e) => e.user === userId);
    const courses = enrollments.map((e) => 
      db.courses.find((c) => c._id === e.course)
    ).filter(Boolean);
    return courses;
  };
  
  const enrollUserInCourse = (userId, courseId) => {
    const enrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId
    };
    db.enrollments.push(enrollment);
    return enrollment;
  };
  
  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  };
  
  return {
    createUser, 
    findAllUsers, 
    findUserById, 
    findUserByUsername, 
    findUserByCredentials, 
    updateUser, 
    deleteUser,
    findCoursesForUser,
    enrollUserInCourse,
    unenrollUserFromCourse
  };
}