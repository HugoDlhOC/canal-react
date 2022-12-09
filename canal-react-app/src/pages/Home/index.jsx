import Header from "../../components/Header";
import Gallery from "../../components/Gallery";

const Home = () => {
  return (
    <div>
      <Header />
      <Gallery
        urlApi="trending/all/day"
        galleryTitle="Films & séries du jour"
        optionalParameterUrlApi="&language=fr"
      />
      <Gallery
        urlApi="movie/popular"
        galleryTitle="Films populaires"
        optionalParameterUrlApi="&language=fr"
      />
      <Gallery
        urlApi="tv/popular"
        galleryTitle="Séries populaires"
        optionalParameterUrlApi="&language=fr"
      />
    </div>
  );
};

export default Home;
