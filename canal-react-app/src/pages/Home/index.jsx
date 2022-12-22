import Header from "../../components/Header";
import Gallery from "../../components/Gallery";
import { CanalContextProvider } from "../../context/CanalHomeContext";

const Home = () => {
  return (
    <div>
      <Header />
      <CanalContextProvider>
        <Gallery
          urlApi="trending/all/day"
          galleryTitle="Films & séries du jour"
          optionalParameterUrlApi="&language=fr"
          typeOfData={"multi"}
          idGalleryLoader={0}
        />
      </CanalContextProvider>
      <CanalContextProvider>
        <Gallery
          urlApi="movie/popular"
          galleryTitle="Films populaires"
          optionalParameterUrlApi="&language=fr"
          typeOfData={"movie"}
          idGalleryLoader={1}
        />
      </CanalContextProvider>
      <CanalContextProvider>
        <Gallery
          urlApi="tv/popular"
          galleryTitle="Séries populaires"
          optionalParameterUrlApi="&language=fr"
          typeOfData={"tv"}
          idGalleryLoader={2}
        />
      </CanalContextProvider>
    </div>
  );
};

export default Home;
