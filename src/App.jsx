import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

import Home         from './pages/Home';
import Courses      from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Blog         from './pages/Blog';
import About        from './pages/About';
import Contact      from './pages/Contact';
import Login        from './pages/Login';
import Register     from './pages/Register';
import Dashboard    from './pages/Dashboard';
import NotFound     from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"              element={<Home />} />
            <Route path="/courses"       element={<Courses />} />
            <Route path="/courses/:id"   element={<CourseDetails />} />
            <Route path="/blog"          element={<Blog />} />
            <Route path="/about"         element={<About />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="/login"         element={<Login />} />
            <Route path="/register"      element={<Register />} />
            <Route path="/dashboard"     element={<Dashboard />} />
            <Route path="*"              element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
