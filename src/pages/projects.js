// import React, { useContext, useEffect } from 'react';
// import { UserContext } from '../context/UserContext';
// import Layout from "../components/Layout"
// import { graphql } from "gatsby"
// import Projects from "../components/Projects"
// // ...GatsbyImageSharpFluid

// const ProjectsPage = ({ data: { allStrapiProjects: { nodes: projects } } }) => {

//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem("user")));
//   }, []);
//   const { user, setUser } = useContext(UserContext);

//   let newProjects = [];
//   if (user) {
//     const lectures = user.user.lecture_categories;
//     let codes = [];
//     lectures.forEach(lecture => {
//       codes.push(lecture.code);
//     })

//     projects.forEach(project => {
//       if (project.lecture_categories[0] &&
//         codes.includes(project.lecture_categories[0].code)) {
//         newProjects = [...newProjects, project]
//       }
//     })
//   }

//   return <Layout>
//     <section className="project-page">
//       <Projects projects={newProjects} title="All Lectures" />
//     </section>
//   </Layout>
// }
// export default ProjectsPage

// export const query = graphql`
// {
//   allStrapiProjects(filter: {featured: {eq: true}}, sort: {fields: strapiId, order: DESC}) {
//     nodes {
//       lecture_categories {
//         code
//         name
//       }
//       github
//       id
//       strapiId
//       description
//       title
//       url
//       image {
//         childImageSharp {
//           fluid {
//             src
//           }
//         }
//       }
//       stack {
//         id
//         title
//       }
//     }
//   }         
// }
// `