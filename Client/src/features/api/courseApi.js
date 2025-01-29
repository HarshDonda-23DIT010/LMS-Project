import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = "http://localhost:3000/api/v1/course"

export const courseApi = createApi({
   reducerPath: "courseApi",
   baseQuery: fetchBaseQuery({
      baseUrl: COURSE_API,
      credentials: "include"

   }),
   endpoints: (builder) => ({
      createCourse: builder.mutation({
         query: ({ courseTitle, category }) => ({
            url: "",
            method: "POST",
            body: { courseTitle, category }
         })
      }),
      getCreaterCourse: builder.query({
         query: () => ({
            url: "",
            method: "GET",
         })
      }),
      editCourse: builder.mutation({
         query: ({ formData, courseId }) => ({
            url: `/${courseId}`,
            method: "PUT",
            body: formData
         })
      }),
      getCourseById: builder.query({
         query: (id) => ({
            url: `/${id}`,
            method: "GET",
         })
      }),
      createLecture: builder.mutation({
         query: ({ lectureTitle, courseId }) => ({
            url: `/${courseId}/lecture`,
            method: "POST",
            body: { lectureTitle }
         })
      }),
      getCourseLecture: builder.query({
         query: (id) => ({
            url: `/${id}/lecture`,
            method: "GET",
         })
      }),
      editLecture: builder.mutation({
         query: ({ lectureTitle, isPreviewFree, videoInfo, courseId, lectureId }) => ({
            url: `/${courseId}/lecture/${lectureId}`,
            method: "POST",
            body: { lectureTitle, isPreviewFree, videoInfo }
         })
      }),
      removeLecture: builder.mutation({
         query: ({ lectureId, courseId }) => ({
            url: `/${courseId}/lecture/${lectureId}`,
            method: "DELETE",
         })
      }),
      getLecture: builder.query({
         query: (id) => ({
            url: `/lecture/${id}`,
            method: "GET",
         })
      }),
      PublishCourse : builder.mutation({
         query:({id , query}) => ({
            url:`/${id}?publish=${query}`,
            method: "PATCH",
            body: { isPublished: query === "true" },
         })
      })
   })
})

export const {
   useGetCreaterCourseQuery,
   useCreateCourseMutation,
   useEditCourseMutation,
   useGetCourseByIdQuery,
   useCreateLectureMutation,
   useGetCourseLectureQuery,
   useEditLectureMutation,
   useRemoveLectureMutation,
   useGetLectureQuery,
   usePublishCourseMutation
} = courseApi 