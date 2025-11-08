"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollUserInCourse, unenrollUserFromCourse } from "../Enrollments/reducer";
import { RootState } from "../store";
import * as db from "../Database";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
} from "react-bootstrap";

// Define the Course interface
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image?: string;
  description: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface User {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export default function Dashboard() {
  // Get courses from Redux store instead of local state
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as { currentUser: User | null };
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  
  // State for showing all courses or only enrolled courses
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  // Function to check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  // Function to handle enrollment toggle
  const handleEnrollmentToggle = (courseId: string) => {
    if (!currentUser) return;
    
    if (isEnrolled(courseId)) {
      dispatch(unenrollUserFromCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollUserInCourse({ userId: currentUser._id, courseId }));
    }
  };

  // Only keep local state for the form (course being created/edited)
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  // Check if current user is faculty (only faculty can add/edit/delete courses)
  const isFaculty = currentUser?.role === "FACULTY";

  // Filter courses based on enrollment view toggle
  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((course: Course) => isEnrolled(course._id));

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {/* Enrollments Toggle Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button 
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-btn"
        >
          Enrollments
        </Button>
      </div>
      
      {/* Form for creating/editing courses - Only show for Faculty */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          
          {/* Form inputs for course name and description */}
          <Form.Control
            value={course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            as="textarea"
            value={course.description}
            rows={3}
            placeholder="Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      
      {/* Courses grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses
            .map((course: Course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image || "/images/reactjs.jpg"}
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    
                    {/* Button Container */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button variant="primary" className="me-2">Go</Button>
                        
                        {/* Enrollment/Unenrollment Button */}
                        {currentUser && (
                          <Button
                            variant={isEnrolled(course._id) ? "danger" : "success"}
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnrollmentToggle(course._id);
                            }}
                          >
                            {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                          </Button>
                        )}
                      </div>
                      
                      {/* Edit and Delete buttons - Only show for Faculty */}
                      {isFaculty && (
                        <div>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning btn-sm me-1"
                          >
                            Edit
                          </button>
                          
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger btn-sm"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}