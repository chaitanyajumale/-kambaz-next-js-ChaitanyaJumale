"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as client from "../../../client";
import { addAssignment, updateAssignment } from "../reducer";

interface AssignmentData {
  _id?: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
  assignmentGroup?: string;
  displayGradeAs?: string;
  submissionType?: string;
  onlineEntryOptions?: string[];
  assignTo?: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const isNewAssignment = aid === "new";
  
  const [assignment, setAssignment] = useState<AssignmentData>({
    title: "Propulsion Assignment",
    course: cid as string,
    description: "Submit a detailed analysis of propulsion mechanisms used in liquid rocket engines.",
    points: 100,
    dueDate: "2025-05-11T23:59",
    availableFromDate: "2025-10-20T00:00",
    availableUntilDate: "2025-12-01T23:59",
    assignmentGroup: "ASSIGNMENTS",
    displayGradeAs: "Percentage",
    submissionType: "Online",
    onlineEntryOptions: ["Website URL", "File Uploads"],
    assignTo: "Everyone",
  });
  
  const [loading, setLoading] = useState(false);

  // Fetch existing assignment if editing
  useEffect(() => {
    const fetchAssignment = async () => {
      if (!isNewAssignment && aid) {
        try {
          setLoading(true);
          const data = await client.findAssignmentById(aid as string);
          setAssignment(data);
        } catch (error) {
          console.error("Error fetching assignment:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchAssignment();
  }, [aid, isNewAssignment]);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      if (isNewAssignment) {
        const newAssignment = await client.createAssignmentForCourse(
          cid as string,
          assignment
        );
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await client.updateAssignment(assignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        if (assignment._id) {
          await client.deleteAssignment(assignment._id);
          router.push(`/Courses/${cid}/Assignments`);
        }
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof AssignmentData, value: any) => {
    setAssignment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (option: string) => {
    const currentOptions = assignment.onlineEntryOptions || [];
    if (currentOptions.includes(option)) {
      handleChange("onlineEntryOptions", currentOptions.filter(o => o !== option));
    } else {
      handleChange("onlineEntryOptions", [...currentOptions, option]);
    }
  };

  if (loading && !isNewAssignment) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <Container fluid className="p-4" style={{ maxWidth: "800px", marginLeft: 0 }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label><strong>Assignment Name</strong></Form.Label>
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={(e) => handleChange("title", e.target.value)}
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) => handleChange("description", e.target.value)}
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label><strong>Points</strong></Form.Label>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) => handleChange("points", parseInt(e.target.value) || 0)}
              min="0"
              style={{ fontSize: "14px" }}
            />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label><strong>Assignment Group</strong></Form.Label>
            <Form.Select
              value={assignment.assignmentGroup}
              onChange={(e) => handleChange("assignmentGroup", e.target.value)}
              style={{ fontSize: "14px" }}
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display Grade as */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label><strong>Display Grade as</strong></Form.Label>
            <Form.Select
              value={assignment.displayGradeAs}
              onChange={(e) => handleChange("displayGradeAs", e.target.value)}
              style={{ fontSize: "14px" }}
            >
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Complete/Incomplete">Complete/Incomplete</option>
              <option value="Letter Grade">Letter Grade</option>
              <option value="GPA Scale">GPA Scale</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label><strong>Submission Type</strong></Form.Label>
            <Form.Select
              value={assignment.submissionType}
              onChange={(e) => handleChange("submissionType", e.target.value)}
              style={{ fontSize: "14px" }}
            >
              <option value="Online">Online</option>
              <option value="On Paper">On Paper</option>
              <option value="No Submission">No Submission</option>
              <option value="External Tool">External Tool</option>
            </Form.Select>
          </Col>
        </Row>
        
        {assignment.submissionType === "Online" && (
          <div className="mb-4 p-3 border rounded">
            <h6><strong>Online Entry Options</strong></h6>
            <Form.Check
              type="checkbox"
              label="Text Entry"
              checked={assignment.onlineEntryOptions?.includes("Text Entry") || false}
              onChange={() => handleCheckboxChange("Text Entry")}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="Website URL"
              checked={assignment.onlineEntryOptions?.includes("Website URL") || false}
              onChange={() => handleCheckboxChange("Website URL")}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              checked={assignment.onlineEntryOptions?.includes("Media Recordings") || false}
              onChange={() => handleCheckboxChange("Media Recordings")}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              checked={assignment.onlineEntryOptions?.includes("Student Annotation") || false}
              onChange={() => handleCheckboxChange("Student Annotation")}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              checked={assignment.onlineEntryOptions?.includes("File Uploads") || false}
              onChange={() => handleCheckboxChange("File Uploads")}
            />
          </div>
        )}

        {/* Assign */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label><strong>Assign to</strong></Form.Label>
            <Form.Control
              type="text"
              value={assignment.assignTo}
              onChange={(e) => handleChange("assignTo", e.target.value)}
              style={{ fontSize: "14px" }}
            />
          </Col>
        </Row>

        {/* Due Date */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label><strong>Due</strong></Form.Label>
            <Form.Control
              type="datetime-local"
              value={assignment.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              style={{ fontSize: "14px" }}
            />
          </Col>
        </Row>

        {/* Available From and Until */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Label><strong>Available from</strong></Form.Label>
            <Form.Control
              type="datetime-local"
              value={assignment.availableFromDate}
              onChange={(e) => handleChange("availableFromDate", e.target.value)}
              style={{ fontSize: "14px" }}
            />
          </Col>
          <Col md={6}>
            <Form.Label><strong>Until</strong></Form.Label>
            <Form.Control
              type="datetime-local"
              value={assignment.availableUntilDate}
              onChange={(e) => handleChange("availableUntilDate", e.target.value)}
              style={{ fontSize: "14px" }}
            />
          </Col>
        </Row>

        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-between mt-3">
          <div>
            <Button 
              variant="outline-secondary" 
              onClick={handleCancel}
              className="me-2"
              style={{ borderRadius: "4px" }}
            >
              Cancel
            </Button>
            {!isNewAssignment && (
              <Button 
                variant="danger" 
                onClick={handleDelete}
                style={{ borderRadius: "4px" }}
              >
                Delete
              </Button>
            )}
          </div>
          <Button 
            variant="danger" 
            onClick={handleSave}
            disabled={loading || !assignment.title}
            style={{ borderRadius: "4px", backgroundColor: "#dc3545", borderColor: "#dc3545" }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}