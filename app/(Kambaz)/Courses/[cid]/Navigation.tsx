// import Link from "next/link";

// export default function CourseNavigation() {
//   return (
//     <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
//       <style>{`
//         .wd.list-group > .list-group-item.active {
//           color: black !important;
//           background-color: white !important;
//           border-left: 3px solid black !important;
//         }
//       `}</style>
//       <Link href="/Courses/1234/Home" id="wd-course-home-link"
//         className="list-group-item active border-0">
//         Home
//       </Link>
//       <Link href="/Courses/1234/Modules" id="wd-course-modules-link"
//         className="list-group-item text-danger border-0">
//         Modules
//       </Link>
//       <Link href="/Courses/1234/Piazza" id="wd-course-piazza-link"
//         className="list-group-item text-danger border-0">
//         Piazza
//       </Link>
//       <Link href="/Courses/1234/Zoom" id="wd-course-zoom-link"
//         className="list-group-item text-danger border-0">
//         Zoom
//       </Link>
//       <Link href="/Courses/1234/Assignments" id="wd-course-assignments-link"
//         className="list-group-item text-danger border-0">
//         Assignments
//       </Link>
//       <Link href="/Courses/1234/Quizzes" id="wd-course-quizzes-link"
//         className="list-group-item text-danger border-0">
//         Quizzes
//       </Link>
//       <Link href="/Courses/1234/Grades" id="wd-course-grades-link"
//         className="list-group-item text-danger border-0">
//         Grades
//       </Link>
//       <Link href="/Courses/1234/People/Table" id="wd-course-people-link"
//         className="list-group-item text-danger border-0">
//         People
//       </Link>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const cid = params.cid; // Get the course ID from the dynamic route
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <style>{`
        .wd.list-group > .list-group-item.active {
          color: black !important;
          background-color: white !important;
          border-left: 3px solid black !important;
        }
      `}</style>
      
      {links.map((link) => {
        // Special handling for People link which goes to /People/Table
        const href = link === "People" 
          ? `/Courses/${cid}/People/Table`
          : `/Courses/${cid}/${link}`;
        
        // Check if current path includes this link (case-insensitive for safety)
        const isActive = pathname.toLowerCase().includes(`/${link.toLowerCase()}`);
        
        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}