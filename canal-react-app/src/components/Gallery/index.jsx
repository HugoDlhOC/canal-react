import { useEffect, useState } from "react";

const Gallery = () => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=ade02ea5f909697eb890e5479757edf0"
    )
      .then((promise) => promise.json())
      .then((data) => {
        setData(data.results);
      });
  }, []);

  console.log(data);
  if (data !== undefined) {
    return (
      <div className="gallery">
        {data.map((item, key) => (
          <img
            className="gallery__image"
            key={key}
            src={"https://image.tmdb.org/t/p/original/" + item.poster_path}
          />
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Gallery;
