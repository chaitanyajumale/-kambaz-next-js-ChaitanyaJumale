import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const fetchProfile = async () => {
    if (currentUser) {
      setPending(false);
      return;
    }
    
    try {
      const sessionUser = await client.profile();
      dispatch(setCurrentUser(sessionUser));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("No active session");
    }
    setPending(false);
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  if (pending) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return children;
}