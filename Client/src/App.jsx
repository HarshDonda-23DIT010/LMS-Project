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
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes';
import { PurchaseCourseProtectedRoute } from './components/PurchasedCourseProtectedRoute';
import { ThemeProvider } from './components/TheamProvider';

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
        element: <AuthenticatedUser> <Login /> </AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: <ProtectedRoute>  <MyLearning /> </ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute> <Profile /> </ProtectedRoute>
      },
      {
        path: "course/search",
        element: <ProtectedRoute> <SearchaPage /> </ProtectedRoute>
      },

      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute> <CourseDetail /> </ProtectedRoute>
      },
      {
        path: "course-progress/:courseId",
        element: <PurchaseCourseProtectedRoute>
          <ProtectedRoute>
            <CourseProgress />
          </ProtectedRoute>
        </PurchaseCourseProtectedRoute>
      },
      // admin route
      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute>,
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
      <ThemeProvider>
      <RouterProvider router={appRouter}>

      </RouterProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;