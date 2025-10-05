// import Link from "next/link";
// export default function KanbasNavigation() {
//   return (
//     <div id="wd-kanbas-navigation">
//       <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/>
//       • <Link href="/Account" id="wd-account-link">Account</Link><br/>
//       • <Link href="/Dashboard" id="wd-dashboard-link">Dashboard</Link><br/>
//       • <Link href="/Courses" id="wd-course-link">Courses</Link><br/>
//       • <Link href="/Calendar" id="wd-calendar-link">Calendar</Link><br/>
//       • <Link href="/Inbox" id="wd-inbox-link">Inbox</Link><br/>
//       • <Link href="/Labs" id="wd-labs-link">Labs</Link><br/>
//     </div>
//   );
// }

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }}
         className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroupItem 
        className="bg-black border-0 text-center" 
        as="a"
        target="_blank" 
        href="https://www.northeastern.edu/" 
        id="wd-neu-link"
      >
        <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <br />
      
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <br />
      
      <ListGroupItem className="border-0 bg-white text-center">
        <Link href="/Dashboard" id="wd-dashboard-link" className="text-danger text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <br />
      
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Courses" id="wd-course-link" className="text-white text-decoration-none">
          <LiaBookSolid className="fs-1 text-white" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <br />
      
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Calendar" id="wd-calendar-link" className="text-white text-decoration-none">
          <IoCalendarOutline className="fs-1 text-white" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <br />
      
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Inbox" id="wd-inbox-link" className="text-white text-decoration-none">
          <FaInbox className="fs-1 text-white" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <br />
      
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Labs" id="wd-labs-link" className="text-white text-decoration-none">
          <LiaCogSolid className="fs-1 text-white" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}