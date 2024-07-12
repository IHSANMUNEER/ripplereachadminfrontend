import React, { useMemo, } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";


import {
  Layout,
  Dashboard,
  Login,
  Read,
  Blogs,
  Error,
  CryptoBlogs,
  SearchResults,

  AddBlogPost,
  ShowBlogs

} from "scenes";




const App = () => {
  
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  

  return (
    
    <div className="app">
      <BrowserRouter>
  
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
             
              <Route path="*" element={<Error />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/read" element={<Read />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crypto" element={<CryptoBlogs category="cryptoblog" />} />
              <Route path="/cricket" element={<CryptoBlogs category="cricketblog"  heading = 'Cricket Blog'/>} />
              <Route path="/travel" element={<CryptoBlogs category="travelblog"  heading="Travel Blog"/>} />
              <Route path="/fashion" element={<CryptoBlogs category="fashionblog"  heading="Fashion Blog"/>} />
              <Route path="/technology" element={<CryptoBlogs category="technologyblog"  heading="Technology Blog"/>} />
              <Route path="/health" element={<CryptoBlogs category="healthblog"  heading="Health Blog"/>} />
              <Route path="/science" element={<CryptoBlogs category="scienceblog"  heading="Science Blog"/>} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/admin11209@" element={<AddBlogPost />} />
              <Route path="/adminblogaction" element={<ShowBlogs />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
