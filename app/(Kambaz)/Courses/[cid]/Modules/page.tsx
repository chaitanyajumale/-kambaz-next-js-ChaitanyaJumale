"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, Form } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessenControlButtons";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { RootState } from "../../../store";
import * as client from "../../client";

interface Lesson {
  name: string;
  description?: string;
}

interface Module {
  _id: string;
  name: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const fetchModules = async () => {
    if (!courseId) return;
    const modules = await client.findModulesForCourse(courseId);
    console.log("Fetched modules:", modules);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const onCreateModuleForCourse = async () => {
    if (!courseId) return;
    const newModule = { name: moduleName };
    const createdModule = await client.createModuleForCourse(courseId, newModule);
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!courseId) return;
    await client.deleteModule(courseId, moduleId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpdateModule = async (module: any) => {
    if (!courseId) return;
    await client.updateModule(courseId, module);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };
  
  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
      <br /><br /><br />
      
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: Module) => (
          <ListGroupItem 
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {!module.editing && module.name}
              
              {module.editing && (
                <Form.Control
                  className="w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              
              <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson, index) => (
                  <ListGroupItem 
                    key={`${module._id}-lesson-${index}`}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                    
                    {lesson.description && (
                      <ul className="wd-content">
                        {lesson.description.split('\n').map((item, i) => (
                          <li key={i} className="wd-content-item">{item}</li>
                        ))}
                      </ul>
                    )}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}