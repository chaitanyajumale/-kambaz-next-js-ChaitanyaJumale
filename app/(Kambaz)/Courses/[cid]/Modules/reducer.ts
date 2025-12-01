import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Lesson {
  name: string;
  description?: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setModules: (state, action: PayloadAction<any[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<{ name: string }>) => {
      const newModule: Module = {
        _id: uuidv4(),
        name: action.payload.name,
        lessons: [],
      };
      state.modules.push(newModule);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (m) => m._id !== action.payload
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateModule: (state, action: PayloadAction<any>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : { ...m, editing: false }
      );
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;