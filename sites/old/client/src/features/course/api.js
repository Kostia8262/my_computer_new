import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCourses = async () => {
    const { data } = await axios.get("/api/courses");
    return data;
};

export const useCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
        staleTime: 60 * 1000, // кеш 1 минута
    });
};
