import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
// import Projects from "../components/Projects"
import Notices from "../components/Notices"
import Lectures from '../components/Lectures';
import About from '../components/About';
import { Link } from 'gatsby';


export default ({ data }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("index.js useEffect", JSON.parse(localStorage.getItem("user")));
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("index.js useEffect, After setUser", user);
  }, []);

  let LoggedInMenus = false;

  if (user && user.user.is_active) {
    LoggedInMenus = true;
  }

  const {
    allStrapiNotices: { nodes: notices },
    allStrapiLectures: { nodes: lectures },
    // allStrapiBlogs: { nodes: blogs },
  } = data;

  window.onbeforeunload = () => {
    localStorage.removeItem('user');
  }
  return (
    <Layout>
      <Hero />
      <About />
      <Notices notices={notices} title="the latest notice" showLink />
    </Layout>
  )
}

export const query = graphql`
  {    
    allStrapiNotices(sort: {fields: date, order: DESC}, limit: 1) {
      nodes {
        date(formatString: "MMMM Do, YYYY")
        notice_title
        strapiId
        notice_item {
          id
          name
        }
      }
    }
    
    allStrapiLectures(sort: {fields: date, order: DESC}, limit: 3) {
      nodes {
        teacher
        slug
        desc
        date(formatString: "MMMM Do, YYYY")
        id
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

