"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./Account/Session";

export default function KambazLayout({ 
  children 
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
        <KambazNavigation />
        <div id="wd-kambaz" style={{ marginLeft: "100px" }}>
          <div className="d-flex">
            <div className="p-3 ps-md-5 flex-fill">
              {children}
            </div>
          </div>
        </div>
      </Session>
    </Provider>
  );
}