"use client"

import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as client from "../../../client";

export default function PeopleTable({ 
  users = [], 
  fetchUsers 
}: { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users?: any[]; 
  fetchUsers: () => void; 
}) {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courseUsers, setCourseUsers] = useState<any[]>([]);

  const fetchCourseUsers = async () => {
    if (!cid) return;
    const courseId = Array.isArray(cid) ? cid[0] : cid;
    const users = await client.findUsersForCourse(courseId);
    setCourseUsers(users);
  };

  useEffect(() => {
    fetchCourseUsers();
  }, [cid]);

  const displayUsers = users.length > 0 ? users : courseUsers;

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {displayUsers.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}