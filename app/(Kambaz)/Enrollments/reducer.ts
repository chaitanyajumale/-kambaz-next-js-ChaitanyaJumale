import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enrollUserInCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const newEnrollment: Enrollment = {
        _id: Date.now().toString(),
        user: action.payload.userId,
        course: action.payload.courseId,
      };
      state.enrollments.push(newEnrollment);
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

export const { setEnrollments, enrollUserInCourse, unenrollUserFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;