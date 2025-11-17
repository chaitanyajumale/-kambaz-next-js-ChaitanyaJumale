"use client";

import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    console.log("Signin clicked with credentials:", credentials.username);
    
    if (!credentials.username || !credentials.password) {
      alert("Please enter username and password");
      return;
    }
    
    try {
      const user = await client.signin(credentials);
      console.log("Signin successful, user:", user);
      
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Signin error:", error);
      
      if (error.response?.status === 401) {
        alert("Invalid username or password");
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Sign in failed. Please check the console for details.");
      }
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      <FormControl
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button 
        onClick={signin} 
        id="wd-signin-btn" 
        variant="primary"
        className="w-100 mb-2"
      >
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}