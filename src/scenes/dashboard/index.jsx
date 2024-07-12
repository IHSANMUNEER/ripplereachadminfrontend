import React from "react";

import TrendingPosts from '../crousel/index'
import Blogs from '../blogs/index'
import Footer from '../footer/index'

const Dashboard = () => {


  return (
    <>
      <TrendingPosts />
     

      <Blogs heading="Top Trendings" />

      <Footer />
    </>
  );
};

export default Dashboard;
