"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

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

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  
  const isNewAssignment = aid === 'new';
  
  // Find the specific assignment if editing
  const existingAssignment = !isNewAssignment 
    ? assignments.find((a: Assignment) => a._id === aid && a.course === cid)
    : null;
  
  // Initialize form state
  const [formData, setFormData] = useState<Omit<Assignment, '_id'>>({
    title: existingAssignment?.title || "New Assignment",
    course: cid as string,
    description: existingAssignment?.description || `The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`,
    points: existingAssignment?.points || 100,
    dueDate: existingAssignment?.dueDate || "2024-05-13T23:59",
    availableFromDate: existingAssignment?.availableFromDate || "2024-05-06",
    availableUntilDate: existingAssignment?.availableUntilDate || "",
  });

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(formData));
    } else if (existingAssignment) {
      dispatch(updateAssignment({
        ...formData,
        _id: existingAssignment._id,
      }));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };
  
  if (!isNewAssignment && !existingAssignment) {
    return (
      <div className="p-3">
        <h3>Assignment not found</h3>
        <Button variant="secondary" onClick={handleCancel}>
          Back to Assignments
        </Button>
      </div>
    );
  }
  
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control 
            id="wd-name" 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            size="lg"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control 
            id="wd-description"
            as="textarea"
            rows={10}
            style={{ lineHeight: "1.6", fontFamily: "inherit" }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Row className="align-items-center mb-3">
              <Col sm={4} className="text-end">
                <Form.Label htmlFor="wd-points">Points</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  id="wd-points" 
                  type="number" 
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col sm={4} className="text-end">
                <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="PROJECT">PROJECT</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col sm={4} className="text-end">
                <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                  <option value="Percentage">Percentage</option>
                  <option value="Points">Points</option>
                  <option value="Complete/Incomplete">Complete/Incomplete</option>
                  <option value="Letter Grade">Letter Grade</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Row className="align-items-start mb-3">
              <Col sm={4} className="text-end">
                <Form.Label>Submission Type</Form.Label>
              </Col>
              <Col sm={8}>
                <Card className="p-3">
                  <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
                    <option value="Online">Online</option>
                    <option value="On Paper">On Paper</option>
                    <option value="No Submission">No Submission</option>
                  </Form.Select>
                  
                  <div>
                    <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                    <Form.Check 
                      type="checkbox" 
                      id="wd-text-entry"
                      label="Text Entry"
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="wd-website-url"
                      label="Website URL"
                      defaultChecked={true}
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="wd-media-recordings"
                      label="Media Recordings"
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="wd-student-annotation"
                      label="Student Annotation"
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="wd-file-upload"
                      label="File Uploads"
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Row className="align-items-start mb-3">
              <Col sm={4} className="text-end">
                <Form.Label>Assign</Form.Label>
              </Col>
              <Col sm={8}>
                <Card className="p-3">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                    <Form.Control 
                      id="wd-assign-to" 
                      type="text"
                      defaultValue="Everyone"
                      className="mb-3"
                    />
                    <button 
                      type="button" 
                      className="btn btn-sm position-absolute"
                      style={{ right: '25px', top: '45px' }}
                    >
                      ×
                    </button>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                    <Form.Control 
                      id="wd-due-date" 
                      type="datetime-local" 
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                        <Form.Control 
                          id="wd-available-from" 
                          type="date" 
                          value={formData.availableFromDate}
                          onChange={(e) => setFormData({ ...formData, availableFromDate: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                        <Form.Control 
                          id="wd-available-until" 
                          type="date" 
                          value={formData.availableUntilDate}
                          onChange={(e) => setFormData({ ...formData, availableUntilDate: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form.Group>
        </Row>

        <hr className="my-4" />

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}