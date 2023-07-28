/*********************************************************************************
 *  WEB422 – Assignment 3
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Keith Cao Student ID: 143332211 Date: June 15, 2023
 *  Vercel Link: https://assignment3-chi.vercel.app/
 *
 ********************************************************************************/
import Link from "next/link";
import Card from "react-bootstrap/Card";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

export function getStaticProps() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://periwinkle-jackrabbit-wrap.cyclic.app/api/movies/573a1390f29313caabcd42e8"
    )
      .then((res) => res.json())
      .then((data) => resolve({ props: { movie: data } }))
      .catch((err) => reject("could not fetch movie"));
  });
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer: Keith Cao" />
      <Card>
        <Card.Body>
          <p>
            I am a second-year CPA student at Seneca College. This is part of my
            WEB422 assignment, the third web development course I am taking. I
            am learning how to use react with the next.js framework.
          </p>
          <Link href="/movies/The Great Train Robbery" passHref legacyBehavior>
            The Great Train Robbery
          </Link>
        </Card.Body>
        <MovieDetails movie={props.movie} />
      </Card>
    </>
  );
}
