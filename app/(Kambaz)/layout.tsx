// import { ReactNode } from "react";
// import KambazNavigation from "./Navigation";
// export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
//  return (
//    <table>
//      <tbody>
//        <tr>
//          <td valign="top" width="200">  <KambazNavigation /> </td>
//          <td valign="top" width="100%"> {children}           </td>
//        </tr>
//      </tbody>
//    </table>
// );}

// import { ReactNode } from "react";
// import KambazNavigation from "./Navigation";

// export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
//   return (
//     <div id="wd-kambaz">
//       <div className="d-flex">
//         <div>
//           <KambazNavigation />
//         </div>
//         <div className="flex-fill">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <KambazNavigation />
      <div id="wd-kambaz" style={{ marginLeft: "180px" }}>
        <div className="d-flex">
          <div className="flex-fill">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}