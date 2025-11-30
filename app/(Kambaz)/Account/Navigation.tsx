"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface User {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as { currentUser: User | null };
  
  const links = currentUser 
    ? currentUser.role === "ADMIN" 
      ? ["Profile", "Users"] 
      : ["Profile"]
    : ["Signin", "Signup"];
    
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <style>{`
        .wd.list-group > .list-group-item.active {
          color: black !important;
          background-color: white !important;
          border-left: 3px solid black !important;
        }
      `}</style>
      
      {links.map((link) => (
        <Link 
          key={link}
          href={`/Account/${link}`} 
          id={`wd-account-${link.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            pathname.includes(link.toLowerCase()) ? 'active' : 'text-danger'
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}