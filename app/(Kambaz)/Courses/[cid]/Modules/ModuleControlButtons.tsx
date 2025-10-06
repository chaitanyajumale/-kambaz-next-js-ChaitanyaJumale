import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end d-inline-flex align-items-center">
      <span className="d-inline-block" style={{ lineHeight: 1 }}>
        <GreenCheckmark />
      </span>
      <FaPlus className="ms-1 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}