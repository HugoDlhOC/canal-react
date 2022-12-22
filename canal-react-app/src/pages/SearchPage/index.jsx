import Search from "../../components/Search";
import { CanalContextProvider } from "../../context/CanalHomeContext";

const SearchPage = () => {
  return (
    <div>
      <CanalContextProvider>
        <Search />
      </CanalContextProvider>
    </div>
  );
};

export default SearchPage;
