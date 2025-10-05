// import { ReactNode } from "react";
// import CourseNavigation from "./Navigation";
// export default async function CoursesLayout(
//   { children, params }: {
//   children: ReactNode;
//   params: { cid: string };  
//   })  {
//  const { cid } =  params;
//  return (
//    <div id="wd-courses">
//      <h2>Courses {cid}</h2>
//      <hr />
//      <table>
//        <tbody>
//          <tr>
//            <td valign="top" width="200"> <CourseNavigation /> </td>
//            <td valign="top" width="100%"> {children} </td>
//          </tr>
//        </tbody>
//      </table>
//    </div>
// );}

// import { ReactNode } from "react";
// import CourseNavigation from "./Navigation";
// export default async function CoursesLayout(
//   { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
//  const { cid } = await params;
//  return (
//    <div id="wd-courses">
//      <h2>Courses {cid}</h2>
//      <hr />
//      <table>
//        <tbody>
//          <tr>
//            <td valign="top" width="200"> <CourseNavigation/> </td>
//            <td valign="top" width="100%"> {children} </td>
//          </tr>
//        </tbody>
//      </table>
//    </div>
// );}

import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";

export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}

