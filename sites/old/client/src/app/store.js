import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "@/features/courses/slice";

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
    },
});
