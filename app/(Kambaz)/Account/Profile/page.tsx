"use client";

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Profile</h3>
      <FormControl 
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <FormControl 
        id="wd-password"
        defaultValue="123" 
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormControl 
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
      />
      <FormControl 
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
      />
      <FormControl 
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <FormControl 
        id="wd-email"
        defaultValue="alice@wonderland.com"
        placeholder="email"
        type="email"
        className="mb-2"
      />
      <FormControl 
        as="select"
        id="wd-role"
        defaultValue="USER"
        className="mb-3"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormControl>
      
      <Link href="/Account/Signin" className="text-decoration-none">
        <Button 
          id="wd-signout-btn"
          variant="danger" 
          className="w-100"
        >
          Signout
        </Button>
      </Link>
    </div>
  );
}