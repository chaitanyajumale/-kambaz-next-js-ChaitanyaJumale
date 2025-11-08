import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUserInCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      // Check if enrollment already exists
      const exists = state.enrollments.some(
        (enrollment) =>
          enrollment.user === action.payload.userId &&
          enrollment.course === action.payload.courseId
      );
      
      if (!exists) {
        const newEnrollment: Enrollment = {
          _id: new Date().getTime().toString(),
          user: action.payload.userId,
          course: action.payload.courseId,
        };
        state.enrollments.push(newEnrollment);
      }
    },
    unenrollUserFromCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === action.payload.userId &&
            enrollment.course === action.payload.courseId)
      );
    },
  },
});

export const { enrollUserInCourse, unenrollUserFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;