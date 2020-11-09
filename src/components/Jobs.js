import React, { useState } from "react"
import Title from "./Title"
import { AiFillMinusCircle } from "react-icons/ai"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"


const query = graphql`
  {
    allStrapiJobs(sort: {fields: strapiId, order: DESC}) {
      nodes {
        company
        date
        position
        desc {
          id
          name
          eachItem
          file_name
        }
      }
    }
    allFile(filter: {extension: {in: ["xlsx","pptx"]}}) {
      nodes {
        name
        publicURL
      }
    }
  }
`
const Jobs = () => {
  const data = useStaticQuery(query)
  const { allStrapiJobs: { nodes: jobs } } = data;
  const { allFile: { nodes: files } } = data;
  const [value, setValue] = useState(0);
  const { position, date, desc } = jobs[value];
  console.log("data", data);
  console.log("files", files);
  console.log("files.name", files[0].name);
  const fileNames = files.map(file => file.name);
  console.log("Hi filenames:", fileNames);

  // console.log("filesname", files.name);
  return <section id="jobs" className="section jobs">
    <Title title="About 제이스 어학원" />
    <div className="jobs-center">
      <div className="btn-container">
        {jobs.map((item, index) => {
          console.log("file_name", item.file_name);
          return (
            <button
              onClick={() => setValue(index)}
              key={item.strapiId}
              className={`job-btn ${index === value && `active-btn`}`}>
              {item.company}
            </button>
          )
        })}
      </div>
      {/* job info */}
      <article className="job-info">
        <h3>{position}</h3>
        <p style={{fontWeight:"bold", fontSize:"20px", marginTop:"1rem"}} className="job-date">{date}</p>
        {
          desc.map((item, index) => {
            return <div key={item.id} className="job-desc">
              <AiFillMinusCircle className="job-icon"></AiFillMinusCircle>

              <div className="scool-type">
                <h4>{item.name}</h4>
                {(item.file_name && fileNames.includes(item.file_name)) &&
                  <a
                    href={files[index].publicURL}
                    download>Download</a>}
                <p><ReactMarkdown source={item.eachItem} /></p>
              </div>
            </div>
          })
        }
      </article>
    </div>
    {/* <Link to="/about" className="jobs-btn center-btn">more info</Link> */}
  </section>
}

export default Jobs
