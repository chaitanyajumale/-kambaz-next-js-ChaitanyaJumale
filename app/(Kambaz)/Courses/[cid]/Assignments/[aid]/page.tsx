"use client";

import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control 
            id="wd-name" 
            type="text"
            defaultValue="A1" 
            size="lg"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control 
            id="wd-description"
            as="textarea"
            rows={10}
            style={{ lineHeight: "1.6", fontFamily: "inherit" }}
            defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
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
                  defaultValue="100" 
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
                      defaultValue="2024-05-13T23:59"
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                        <Form.Control 
                          id="wd-available-from" 
                          type="date" 
                          defaultValue="2024-05-06"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                        <Form.Control 
                          id="wd-available-until" 
                          type="date" 
                          defaultValue=""
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
          <Link href="/Courses/1234/Assignments">
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Link href="/Courses/1234/Assignments">
            <Button variant="danger">
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}