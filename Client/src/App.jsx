import './App.css';
import Login from './pages/Login';
import HeroSection from './pages/students/HeroSection';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import { RouterProvider } from 'react-router';
import Courses from './pages/students/Courses';
import MyLearning from './pages/students/MyLearning';
import Profile from './pages/students/Profile';
import Sidebar from './pages/admin/Sidebar';
import DashBoard from './pages/admin/DashBoard';
import AddCourse from './pages/admin/course/AddCourse';
import CourseTable from './pages/admin/course/CourseTable';
import EditCourse from './pages/admin/course/EditCourse';
import CreateLecture from './pages/admin/lecture/CreateLecture';
import EditLecture from './pages/admin/lecture/EditLecture';
import CourseDetail from './pages/students/CourseDetail';
import CourseProgress from './pages/students/CourseProgress';
import SearchaPage from './pages/students/SearchaPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:
          <>
            <HeroSection />
            <Courses />
          </>

      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "course/search",
        element: <SearchaPage />
      },
      
      {
        path: "course-detail/:courseId",
        element: <CourseDetail />
      },
      {
        path: "course-progress/:courseId",
        element: <CourseProgress />
      },
      // admin route
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <DashBoard />
          },
          {
            path: "course",
            element: <CourseTable />,

          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },

        ]
      }
    ]

  }

])
function App() {
  return (
    <main>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </main>
  );
}

export default App;