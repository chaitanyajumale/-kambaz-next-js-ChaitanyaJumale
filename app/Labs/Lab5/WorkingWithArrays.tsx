"use client"

import React, { useState } from "react";
import { FormControl, Form } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  
  const API = `${HTTP_SERVER}/lab5/todos`;
  
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr/>
      
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex align-items-center mb-3">
        <FormControl 
          id="wd-todo-id" 
          defaultValue={todo.id} 
          className="me-2"
          style={{ width: "200px" }}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a 
          id="wd-retrieve-todo-by-id" 
          className="btn btn-primary" 
          href={`${API}/${todo.id}`}
        >
          Get Todo by ID
        </a>
      </div>
      <hr />
      
      <h3>Filtering Array Items</h3>
      <a 
        id="wd-retrieve-completed-todos" 
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr/>
      
      <h3>Creating new Items in an Array</h3>
      <a 
        id="wd-create-todo" 
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr/>
      
      <h3>Deleting from an Array</h3>
      <div className="d-flex align-items-center mb-3">
        <FormControl 
          defaultValue={todo.id} 
          className="me-2"
          style={{ width: "200px" }}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a 
          id="wd-remove-todo" 
          className="btn btn-primary" 
          href={`${API}/${todo.id}/delete`}
        >
          Remove Todo with ID = {todo.id}
        </a>
      </div>
      <hr/>
      
      <h3>Updating an Item in an Array</h3>
      <div className="d-flex align-items-center mb-3">
        <FormControl 
          defaultValue={todo.id} 
          className="me-2"
          style={{ width: "100px" }}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl 
          defaultValue={todo.title} 
          className="me-2 flex-grow-1"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a 
          href={`${API}/${todo.id}/title/${todo.title}`} 
          className="btn btn-primary"
        >
          Update Todo Title
        </a>
      </div>
      <hr />
      
      <h3>Update Completed Status</h3>
      <div className="d-flex align-items-center mb-3">
        <Form.Check 
          type="checkbox"
          id="wd-todo-completed"
          label="Completed"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          className="me-3"
        />
        <a 
          href={`${API}/${todo.id}/completed/${todo.completed}`} 
          className="btn btn-primary"
        >
          Complete Todo ID = {todo.id}
        </a>
      </div>
      <hr />
      
      <h3>Update Description</h3>
      <div className="mb-3">
        <FormControl 
          as="textarea"
          rows={3}
          defaultValue={todo.description} 
          className="mb-2"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <a 
          href={`${API}/${todo.id}/description/${todo.description}`} 
          className="btn btn-primary"
        >
          Describe Todo ID = {todo.id}
        </a>
      </div>
      <hr />
    </div>
  );
}