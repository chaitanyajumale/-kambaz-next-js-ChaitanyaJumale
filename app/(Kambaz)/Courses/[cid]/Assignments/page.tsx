"use client";

import Link from "next/link";
import { FaSearch, FaPlus, FaCaretDown, FaGripVertical } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
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
          <Button variant="danger" id="wd-add-assignment">
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
            <span className="ms-3 text-muted fw-normal">40% of Total</span>
          </h5>
          <div className="d-flex align-items-center">
            <span className="badge rounded-pill bg-secondary me-2">40% of Total</span>
            <FaPlus className="me-2" />
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className="list-group list-group-flush" id="wd-assignment-list">
          <li className="list-group-item wd-assignment-list-item d-flex align-items-start" 
              style={{ borderLeft: "4px solid green" }}>
            <FaGripVertical className="me-2 text-muted mt-2" />
            <MdEditNote className="me-2 text-success fs-3" />
            <div className="flex-grow-1">
              <Link href="/Courses/1234/Assignments/123" 
                    className="wd-assignment-link text-decoration-none text-dark">
                <strong>A1 - ENV + HTML</strong>
              </Link>
              <div className="text-muted small mt-1">
                <span className="text-danger">Multiple Modules</span> | 
                <strong> Not available until</strong> May 6 at 12:00am | 
                <strong> Due</strong> May 13 at 11:59pm | 100 pts
              </div>
            </div>
            <div className="d-flex align-items-center">
              <IoMdCheckmarkCircleOutline className="text-success me-2 fs-5" />
              <BsThreeDotsVertical />
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item d-flex align-items-start"
              style={{ borderLeft: "4px solid green" }}>
            <FaGripVertical className="me-2 text-muted mt-2" />
            <MdEditNote className="me-2 text-success fs-3" />
            <div className="flex-grow-1">
              <Link href="/Courses/1234/Assignments/124" 
                    className="wd-assignment-link text-decoration-none text-dark">
                <strong>A2 - CSS + BOOTSTRAP</strong>
              </Link>
              <div className="text-muted small mt-1">
                <span className="text-danger">Multiple Modules</span> | 
                <strong> Not available until</strong> May 13 at 12:00am | 
                <strong> Due</strong> May 20 at 11:59pm | 100 pts
              </div>
            </div>
            <div className="d-flex align-items-center">
              <IoMdCheckmarkCircleOutline className="text-success me-2 fs-5" />
              <BsThreeDotsVertical />
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item d-flex align-items-start"
              style={{ borderLeft: "4px solid green" }}>
            <FaGripVertical className="me-2 text-muted mt-2" />
            <MdEditNote className="me-2 text-success fs-3" />
            <div className="flex-grow-1">
              <Link href="/Courses/1234/Assignments/125" 
                    className="wd-assignment-link text-decoration-none text-dark">
                <strong>A3 - JAVASCRIPT + REACT</strong>
              </Link>
              <div className="text-muted small mt-1">
                <span className="text-danger">Multiple Modules</span> | 
                <strong> Not available until</strong> May 20 at 12:00am | 
                <strong> Due</strong> May 27 at 11:59pm | 100 pts
              </div>
            </div>
            <div className="d-flex align-items-center">
              <IoMdCheckmarkCircleOutline className="text-success me-2 fs-5" />
              <BsThreeDotsVertical />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}