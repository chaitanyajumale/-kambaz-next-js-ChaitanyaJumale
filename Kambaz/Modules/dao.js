import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((m) => m.course === courseId);
  }

  function createModule(moduleData) {
    const newModule = { ...moduleData, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    const { modules } = db;
    db.modules = modules.filter((m) => m._id !== moduleId);
  }

  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    const targetModule = modules.find((m) => m._id === moduleId);
    Object.assign(targetModule, moduleUpdates);
    return targetModule;
  }

  function findModuleById(moduleId) {
    const { modules } = db;
    return modules.find((m) => m._id === moduleId);
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
    findModuleById
  };
}