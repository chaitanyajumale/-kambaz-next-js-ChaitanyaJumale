"use client";

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Signup</h3>
      <FormControl 
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      <FormControl 
        id="wd-password"
        placeholder="password" 
        type="password"
        className="mb-3"
      />
      <Link href="/Dashboard" className="text-decoration-none">
        <Button 
          id="wd-signup-btn"
          variant="primary" 
          className="w-100 mb-2"
        >
          Signup
        </Button>
      </Link>
      <Link href="/Account/Signin" id="wd-signin-link">
        Signin
      </Link>
    </div>
  );
}