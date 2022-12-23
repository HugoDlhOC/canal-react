import axios from "axios";

export const apiFunction = async (urlApi, apiKey, optionalParameterUrlApi) => {
  try {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${urlApi}?api_key=${apiKey}${optionalParameterUrlApi}`
      )
      .then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
};
