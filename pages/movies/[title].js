import { useRouter } from "next/router";
import useSWR from "swr";
import MovieDetails from "@/components/MovieDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Movie() {
  const router = useRouter();
  const { title } = router.query;

  const { data, error } = useSWR(
    `https://periwinkle-jackrabbit-wrap.cyclic.app/api/movies?page=1&perPage=10&title=${title}`
  );

  console.log(data);

  if (data) {
    if (data.length < 1) {
      return <Error statusCode={404} />;
    }
    return (
      <>
        {data.map((movie) => (
          <>
            <div>
              <PageHeader text={movie.title} />
              <MovieDetails movie={movie} />
            </div>
            <br />
          </>
        ))}
      </>
    );
  }
}
