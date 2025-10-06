"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus, FaCheckCircle, FaBan } from "react-icons/fa";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="d-flex justify-content-end mb-3">
      <Button 
        variant="secondary" 
        className="me-2" 
        size="lg" 
        id="wd-collapse-all"
        style={{ color: "black" }}
      >
        Collapse All
      </Button>
      
      <Button 
        variant="secondary" 
        className="me-2" 
        size="lg" 
        id="wd-view-progress"
        style={{ color: "black" }}
      >
        View Progress
      </Button>
      
      <Dropdown className="me-2">
        <DropdownToggle variant="success" size="lg" id="wd-publish-all-btn">
          <FaCheckCircle className="me-1" /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <FaCheckCircle className="text-success me-2" /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <FaCheckCircle className="text-success me-2" /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <FaCheckCircle className="text-success me-2" /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <FaBan className="text-secondary me-2" /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <FaBan className="text-secondary me-2" /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Button variant="danger" size="lg" id="wd-add-module-btn">
        <FaPlus className="me-1" /> Module
      </Button>
    </div>
  );
}