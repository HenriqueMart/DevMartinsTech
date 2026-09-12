import { useEffect, useState } from "react";
import axios from "axios";

import { Course } from "@/data/@types/course";

interface CoursesResponse {
  data: Course[];
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get<CoursesResponse>(
          "/api/courses"
        );

        setCourses(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);

        setError("Não foi possível carregar os cursos.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return {
    courses,
    isLoading,
    error,
  };
}