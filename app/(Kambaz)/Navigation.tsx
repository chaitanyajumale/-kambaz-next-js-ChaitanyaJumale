// "use client";
// import { AiOutlineDashboard } from "react-icons/ai";
// import { IoCalendarOutline } from "react-icons/io5";
// import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
// import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ListGroupItem } from "react-bootstrap";

// export default function KambazNavigation() {
//   const pathname = usePathname();
//   const links = [
//     { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
//     { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
//     { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
//     { label: "Inbox", path: "/Inbox", icon: FaInbox },
//     { label: "Labs", path: "/Labs", icon: LiaCogSolid },
//   ];

//   return (
//     <div
//       className="position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 d-flex flex-column align-items-center py-3"
//       style={{ width: "110px" }}
//       id="wd-kambaz-navigation"
//     >
//       <a
//         href="https://www.northeastern.edu/"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mb-4 d-block text-center"
//         id="wd-neu-link"
//       >
//         <img
//           src="/images/NU_logo.png"
//           width="75px"
//           alt="Northeastern University"
//         />
//       </a>

//       <Link
//         href="/Account/Signin"
//         id="wd-account-link"
//         className="text-white text-decoration-none text-center mb-4 d-block py-2"
//       >
//         <FaRegCircleUser className="fs-1 d-block mx-auto mb-1" />
//         <div style={{ fontSize: "13px" }}>Account</div>
//       </Link>
      
//             <ListGroupItem as={Link} href="/Account"
//         className={`text-center border-0 bg-black
//             ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
//         <FaRegCircleUser
//           className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
//         <br />
//         Account
//       </ListGroupItem>
//       {links.map((link) => (
//         <ListGroupItem key={link.path} as={Link} href={link.path}
//           className={`bg-black text-center border-0
//               ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
//           {link.icon({ className: "fs-1 text-danger"})}
//           <br />
//           {link.label}
//         </ListGroupItem>
//       ))}
//       <Link
//         href="/Dashboard"
//         id="wd-dashboard-link"
//         className="bg-white text-decoration-none text-center mb-4 d-block py-2 rounded"
//       >
//         <AiOutlineDashboard className="fs-1 text-danger d-block mx-auto mb-1" />
//         <div className="text-dark" style={{ fontSize: "13px" }}>
//           Dashboard
//         </div>
//       </Link>

//       <Link
//         href="/Courses/1234/Home"
//         id="wd-course-link"
//         className="text-white text-decoration-none text-center mb-4 d-block py-2"
//       >
//         <LiaBookSolid className="fs-1 text-danger d-block mx-auto mb-1" />
//         <div style={{ fontSize: "13px" }}>Courses</div>
//       </Link>

//       <Link
//         href="/Calendar"
//         id="wd-calendar-link"
//         className="text-white text-decoration-none text-center mb-4 d-block py-2"
//       >
//         <IoCalendarOutline className="fs-1 text-danger d-block mx-auto mb-1" />
//         <div style={{ fontSize: "13px" }}>Calendar</div>
//       </Link>

//       <Link
//         href="/Inbox"
//         id="wd-inbox-link"
//         className="text-white text-decoration-none text-center mb-4 d-block py-2"
//       >
//         <FaInbox className="fs-1 text-danger d-block mx-auto mb-1" />
//         <div style={{ fontSize: "13px" }}>Inbox</div>
//       </Link>

//       <Link
//         href="/Labs"
//         id="wd-labs-link"
//         className="text-white text-decoration-none text-center mb-4 d-block py-2"
//       >
//         <LiaCogSolid className="fs-1 text-danger d-block mx-auto mb-1" />
//         <div style={{ fontSize: "13px" }}>Labs</div>
//       </Link>
//     </div>
//   );
// }

"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NU_logo.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      
      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black ${
          pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
        />
        <br />
        Account
      </ListGroupItem>
      
      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={link.path}
          className={`bg-black text-center border-0 ${
            pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"
          }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}