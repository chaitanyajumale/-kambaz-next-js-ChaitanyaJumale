import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <div 
      className="position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 d-flex flex-column align-items-center py-3"
      style={{ width: "110px" }}
      id="wd-kambaz-navigation"
    >
      <a 
        href="https://www.northeastern.edu/" 
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 d-block text-center"
        id="wd-neu-link"
      >
        <img src="/images/NU_logo.png" width="75px" alt="Northeastern University" />
      </a>
      
      <Link href="/Account/Signin" id="wd-account-link" 
        className="text-white text-decoration-none text-center mb-4 d-block py-2">
        <FaRegCircleUser className="fs-1 d-block mx-auto mb-1" />
        <div style={{ fontSize: "13px" }}>Account</div>
      </Link>
      
      <Link href="/Dashboard" id="wd-dashboard-link" 
        className="bg-white text-decoration-none text-center mb-4 d-block py-2 rounded">
        <AiOutlineDashboard className="fs-1 text-danger d-block mx-auto mb-1" />
        <div className="text-dark" style={{ fontSize: "13px" }}>Dashboard</div>
      </Link>
      
      <Link href="/Courses/1234/Home" id="wd-course-link" 
        className="text-white text-decoration-none text-center mb-4 d-block py-2">
        <LiaBookSolid className="fs-1 text-danger d-block mx-auto mb-1" />
        <div style={{ fontSize: "13px" }}>Courses</div>
      </Link>
      
      <Link href="/Calendar" id="wd-calendar-link" 
        className="text-white text-decoration-none text-center mb-4 d-block py-2">
        <IoCalendarOutline className="fs-1 text-danger d-block mx-auto mb-1" />
        <div style={{ fontSize: "13px" }}>Calendar</div>
      </Link>
      
      <Link href="/Inbox" id="wd-inbox-link" 
        className="text-white text-decoration-none text-center mb-4 d-block py-2">
        <FaInbox className="fs-1 text-danger d-block mx-auto mb-1" />
        <div style={{ fontSize: "13px" }}>Inbox</div>
      </Link>
      
      <Link href="/Labs" id="wd-labs-link" 
        className="text-white text-decoration-none text-center mb-4 d-block py-2">
        <LiaCogSolid className="fs-1 text-danger d-block mx-auto mb-1" />
        <div style={{ fontSize: "13px" }}>Labs</div>
      </Link>
    </div>
  );
}