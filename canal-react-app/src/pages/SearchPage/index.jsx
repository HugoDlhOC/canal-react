import Search from "../../components/Search";
import { CanalContextProvider } from "../../context/CanalHomeContext";
import Header from "../../components/Header";

const SearchPage = () => {
  return (
    <div>
      <Header />
      <CanalContextProvider>
        <Search />
      </CanalContextProvider>
    </div>
  );
};

export default SearchPage;
