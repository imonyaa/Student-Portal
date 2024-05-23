import React from "react";
import "./courses.css";
import CourseCard from "../../components/cards/courses-cards/course-card";
import image0 from "../../public/images/course0.png";
import image1 from "../../public/images/course1.png";
import image2 from "../../public/images/course2.png";
import image3 from "../../public/images/course3.png";
import image4 from "../../public/images/course4.png";
import image5 from "../../public/images/course5.png";
import image6 from "../../public/images/course6.png";
import image7 from "../../public/images/course7.png";

const Courses = () => {
  const courses = [
    {
      image: image0,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image1,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image2,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image3,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image4,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image5,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image6,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image7,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image0,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image1,
      title: "Course title",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      image: image4,
      title: "electrical engeneering",
      description: "description",
    },
  ];
  return (
    <section className="courses" id="courses">
      <div>
        <h1 className="title">Courses</h1>
        <p className="description">
          On this page, you will discover an extensive collection of all the
          courses you've enrolled in, offering a comprehensive overview of your
          academic or professional journey.
        </p>
      </div>
      <div className="courses-grid">
        {courses.map((item) => (
          <CourseCard
            description={item.description}
            image={item.image}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
};
export default Courses;
