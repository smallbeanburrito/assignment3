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
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Pagination, Accordion } from "react-bootstrap";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const { data, error } = useSWR(
    `https://periwinkle-jackrabbit-wrap.cyclic.app/api/movies?page=${page}&perPage=10`
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  function next() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <PageHeader text="Film Collection : Sorted by Date" />
      <Accordion>
        {pageData.map((data) => (
          <Accordion.Item key={data._id} eventKey={data._id}>
            <Accordion.Header>
              <strong>{data.title}</strong> ({data.year}: Directed by{" "}
              {data.directors ? data.directors.join(", ") : "N/A"})
            </Accordion.Header>
            <Accordion.Body>
              <MovieDetails movie={data} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <br />
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item> {page} </Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
