"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as client from "../Courses/client";
import * as enrollmentClient from "../Enrollments/client";
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
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as { currentUser: User | null };
  const dispatch = useDispatch();
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses || []));
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback to local database
        dispatch(setCourses(db.courses));
      }
    };
    fetchCourses();
  }, [dispatch]);
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!currentUser) {
        setEnrollments([]);
        return;
      }

      try {
        const serverEnrollments = await enrollmentClient.getMyEnrollments();
        console.log("Got enrollments from server:", serverEnrollments);
        setEnrollments(serverEnrollments);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log("Session invalid for enrollments, using local database as fallback");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dbUser = db.users.find((u: any) => u.username === currentUser.username);
          const userId = dbUser ? dbUser._id : currentUser._id;
          const localEnrollments = db.enrollments.filter((e: Enrollment) => e.user === userId);
          setEnrollments(localEnrollments);
        } else {
          console.error("Error fetching enrollments:", error);
          setEnrollments([]);
        }
      }
    };
    
    fetchEnrollments();
  }, [currentUser]);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.course === courseId);
  };

  const handleEnrollmentToggle = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in to enroll in courses");
      return;
    }
    
    try {
      if (isEnrolled(courseId)) {
        await enrollmentClient.unenrollFromCourse(courseId);
        const updatedEnrollments = enrollments.filter(
          e => e.course !== courseId
        );
        setEnrollments(updatedEnrollments);
        console.log(`Unenrolled from ${courseId}`);
      } else {
        await enrollmentClient.enrollInCourse(courseId);
        try {
          const serverEnrollments = await enrollmentClient.getMyEnrollments();
          setEnrollments(serverEnrollments);
        } catch {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dbUser = db.users.find((u: any) => u.username === currentUser.username);
          const userId = dbUser ? dbUser._id : currentUser._id;
          const newEnrollment = {
            _id: Date.now().toString(),
            user: userId,
            course: courseId
          };
          setEnrollments([...enrollments, newEnrollment]);
        }
        console.log(`Enrolled in ${courseId}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Enrollment toggle failed:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please sign in again to modify enrollments.");
      } else {
        alert("Failed to update enrollment. Please try again.");
      }
    }
  };

  // Course management handlers
  const onAddNewCourse = async () => {
    if (!currentUser || currentUser.role !== "FACULTY") {
      alert("Please sign in as faculty to create courses");
      return;
    }
    
    try {
      console.log("1. Creating course:", course);
      console.log("2. Current courses in Redux before creation:", courses);
      
      const newCourse = await client.createCourse(course);
      console.log("3. Course created successfully:", newCourse);

      const allCourses = await client.fetchAllCourses();
      console.log("4. All courses from server after creation:", allCourses);
      console.log("5. Number of courses fetched:", allCourses.length);
      
      dispatch(setCourses(allCourses));
      console.log("6. Redux updated with new courses");
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
      });
      
      alert("Course created successfully! Click 'Show All' to see all courses.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating course:", error);
      if (error.response?.status === 403) {
        alert("Only faculty can create courses");
      } else if (error.response?.status === 401) {
        alert("Session expired. Please sign in again.");
      } else {
        alert("Failed to create course. Please try again.");
      }
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    if (!currentUser || currentUser.role !== "FACULTY") {
      alert("Please sign in as faculty to delete courses");
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }
    
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
      setEnrollments(enrollments.filter(e => e.course !== courseId));
      
      console.log(`Course ${courseId} deleted successfully`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting course:", error);
      if (error.response?.status === 403) {
        alert("Only faculty can delete courses");
      } else if (error.response?.status === 401) {
        alert("Session expired. Please sign in again.");
      } else {
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  const onUpdateCourse = async () => {
    if (!currentUser || currentUser.role !== "FACULTY") {
      alert("Please sign in as faculty to update courses");
      return;
    }

    if (!course._id || course._id === "0") {
      alert("Please select a course to update by clicking Edit on a course card");
      return;
    }
    
    try {
      console.log("Updating course:", course);
      const updatedCourse = await client.updateCourse(course);
      console.log("Course updated successfully:", updatedCourse);

      dispatch(setCourses(courses.map((c) => 
        c._id === course._id ? updatedCourse : c
      )));

      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
      });
      
      alert("Course updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating course:", error);
      if (error.response?.status === 403) {
        alert("Only faculty can update courses");
      } else if (error.response?.status === 401) {
        alert("Session expired. Please sign in again.");
      } else {
        alert("Failed to update course. Please try again.");
      }
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";

  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((course) => isEnrolled(course._id));

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})
        </h2>
        <Button 
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-btn"
        >
          {showAllCourses ? "Show Enrolled" : "Show All"}
        </Button>
      </div>

      {isFaculty && (
        <div className="mb-4 p-3 border rounded">
          <h5>
            Course Management
            <button className="btn btn-primary float-end" onClick={onAddNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2" onClick={onUpdateCourse}>Update</button>
            <button 
              className="btn btn-info float-end me-2" 
              onClick={async () => {
                const allCourses = await client.fetchAllCourses();
                console.log("Debug: All courses from server:", allCourses);
                console.log("Debug: Number of courses:", allCourses.length);
                dispatch(setCourses(allCourses));
                alert(`Fetched ${allCourses.length} courses from server`);
              }}
            >
              Refresh
            </button>
          </h5>
          <br />
          <Form.Control
            value={course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            value={course.number}
            className="mb-2"
            placeholder="Course Number"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />
          <Form.Control
            as="textarea"
            value={course.description}
            rows={3}
            placeholder="Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </div>
      )}
      
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
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
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </CardText>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button variant="primary" className="me-2">Go</Button>
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
                      {isFaculty && (
                        <div>
                          <button
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
                              onDeleteCourse(course._id);
                            }}
                            className="btn btn-danger btn-sm"
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