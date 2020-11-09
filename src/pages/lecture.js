import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Lectures from "../components/Lectures"

const Lecture = ({ data: { allStrapiLectures: { nodes: lectures } } }) => {

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const { user, setUser } = useContext(UserContext);

  let newUserLectures = [];
  if (user) {
    //user's filtered lectures
    const user_lectures = user.user.lecture_categories;
    console.log("user_lectures",user_lectures);
    let codes = [];
    user_lectures.forEach(lecture => {
      codes.push(lecture.code);
    })
    console.log(codes);

    lectures.forEach(user_lecture => {
      console.log("user_lecture",user_lecture);
      if (user_lecture.lecture_categories[0] &&
        codes.includes(user_lecture.lecture_categories[0].code)) {
        console.log("user_lecture.lecture_categories[0]",user_lecture.lecture_categories[0]);
        newUserLectures = [...newUserLectures, user_lecture]
      }
    })
  }
console.log(newUserLectures);
  return <Layout>
    <section className="lecture-page">
      <Lectures lectures={newUserLectures} title="All Lectures" />
    </section>
  </Layout>
}
export default Lecture

export const query = graphql`
{
  allStrapiLectures (sort: {fields: strapiId, order: DESC}){
    nodes {
      lecture_categories {
        code
        name
      }
      strapiId
      title
      teacher
      slug
      desc
      date(formatString: "MMMM Do, YYYY")
      id
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

