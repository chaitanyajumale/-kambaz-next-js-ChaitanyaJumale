"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaPlus, FaCaretDown, FaGripVertical, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { RootState } from "../../../store";
import { deleteAssignment } from "../Assignments/reducer";
import { useState } from "react";

// Define types based on your actual data structure
interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  
  // Filter assignments for the current course
  const courseAssignments = assignments.filter(
    (assignment: Assignment) => assignment.course === cid
  );
  
  // Calculate percentage of total
  const percentageOfTotal = "40%"; // Static value as shown in your UI

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
    }
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const handleAddAssignment = () => {
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  const handleEditAssignment = (assignmentId: string) => {
    router.push(`/Courses/${cid}/Assignments/${assignmentId}`);
  };
  
  return (
    <div id="wd-assignments" className="p-3">
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Search and Button Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text className="bg-white">
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            className="border-start-0"
          />
        </InputGroup>
        
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment" onClick={handleAddAssignment}>
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignments Section */}
      <div className="border rounded-0">
        <div className="bg-light p-3 d-flex justify-content-between align-items-center border-bottom">
          <h5 className="mb-0 d-flex align-items-center">
            <FaCaretDown className="me-2" />
            <strong>ASSIGNMENTS</strong>
            <span className="ms-3 text-muted fw-normal">{percentageOfTotal} of Total</span>
          </h5>
          <div className="d-flex align-items-center">
            <span className="badge rounded-pill bg-secondary me-2">{percentageOfTotal} of Total</span>
            <FaPlus className="me-2" />
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className="list-group list-group-flush" id="wd-assignment-list">
          {courseAssignments.map((assignment: Assignment) => (
            <li 
              key={assignment._id}
              className="list-group-item wd-assignment-list-item d-flex align-items-start" 
              style={{ borderLeft: "4px solid green" }}
            >
              <FaGripVertical className="me-2 text-muted mt-2" />
              <MdEditNote className="me-2 text-success fs-3" />
              <div className="flex-grow-1">
                <div 
                  onClick={() => handleEditAssignment(assignment._id)}
                  className="wd-assignment-link text-decoration-none text-dark"
                  style={{ cursor: "pointer" }}
                >
                  <strong>{assignment._id} - {assignment.title}</strong>
                </div>
                <div className="text-muted small mt-1">
                  <span className="text-danger">Multiple Modules</span> | 
                  <strong> Not available until</strong> {assignment.availableFromDate || "May 6 at 12:00am"} | 
                  <strong> Due</strong> {assignment.dueDate || "May 13 at 11:59pm"} | {assignment.points || 100} pts
                </div>
              </div>
              <div className="d-flex align-items-center">
                <FaTrash 
                  className="text-danger me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(assignment._id)}
                />
                <IoMdCheckmarkCircleOutline className="text-success me-2 fs-5" />
                <BsThreeDotsVertical />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}