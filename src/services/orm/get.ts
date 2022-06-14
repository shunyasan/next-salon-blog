import axios from "axios";
import { apiKey, baseURL } from "./config";

// export const getAxios = (url: string) => {
//   const encode = encodeURI(url);
//   return axios
//     .get(baseURL + encode, {
//       headers: { "x-api-key": apiKey },
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log(err);
//       throw Error;
//     });
// };
