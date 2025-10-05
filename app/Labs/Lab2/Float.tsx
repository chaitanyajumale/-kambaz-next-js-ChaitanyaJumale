import React from "react";
import "./index.css";

export default function Float() {
  return (
    <>
      <div id="wd-float-divs-images">
        <h2>Float - Images</h2>
        <div>
          <img 
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <img 
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <img 
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <img 
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <div className="wd-float-done"></div>
        </div>
      </div>

      <div id="wd-float-divs-colors">
        <h2>Float - Color Boxes</h2>
        <div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red
          </div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          <div className="wd-float-done"></div>
        </div>
      </div>
    </>
  );
}