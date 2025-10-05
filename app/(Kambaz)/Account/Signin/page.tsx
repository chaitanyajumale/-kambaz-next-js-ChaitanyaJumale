"use client";

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Signin</h3>
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
          id="wd-signin-btn"
          variant="primary" 
          className="w-100 mb-2"
        >
          Signin
        </Button>
      </Link>
      <Link href="/Account/Signup" id="wd-signup-link">
        Signup
      </Link>
    </div>
  );
}