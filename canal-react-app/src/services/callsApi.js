export const apiFunction = async (urlApi, apiKey, optionalParameterUrlApi) =>
  fetch(
    `https://api.themoviedb.org/3/${urlApi}?api_key=${apiKey}${optionalParameterUrlApi}`
  ).then((promise) => {
    return promise.json();
  });
