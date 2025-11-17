"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

interface SignupUser {
  username: string;
  password: string;
}

export default function Signup() {
  const [user, setUser] = useState<SignupUser>({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Signup</h3>
      <FormControl 
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl 
        id="wd-password"
        placeholder="password" 
        type="password"
        className="mb-3"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button 
        id="wd-signup-btn"
        variant="primary" 
        className="w-100 mb-2"
        onClick={signup}
      >
        Signup
      </Button>
      <Link href="/Account/Signin" id="wd-signin-link">
        Signin
      </Link>
    </div>
  );
}