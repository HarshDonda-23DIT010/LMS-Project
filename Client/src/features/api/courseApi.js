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
      getPublishedCourse: builder.query({
         query: () => ({
            url: "/published-courses",
            method: "GET",
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
      PublishCourse: builder.mutation({
         query: ({ id, query }) => ({
            url: `/${id}?publish=${query}`,
            method: "PATCH",
            body: { isPublished: query === "true" },
         })
      }),
      getSearchCourse:builder.query({
         query: ({searchQuery, categories, sortByPrice}) => {
           // Build qiery string
           let queryString = `/course-search?query=${encodeURIComponent(searchQuery)}`
   
           // append cateogry 
           if(categories && categories.length > 0) {
            const categoriesString = categories.map(encodeURIComponent).join(",");
            queryString += `&categories=${categoriesString}`; 
          }
   
           // Append sortByPrice is available
           if(sortByPrice){
             queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
           }
   
           return {
             url:queryString,
             method:"GET", 
           }
         }
       }),
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
   usePublishCourseMutation,
   useGetPublishedCourseQuery,
   useGetSearchCourseQuery
} = courseApi 