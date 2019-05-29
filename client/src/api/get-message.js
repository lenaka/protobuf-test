import * as axios from "axios";

export function getMessage() {
  const httpClient = axios.create();
  return httpClient.get('http://localhost:3001/api/messages', { responseType: 'arraybuffer' })
    .then((response) => {
      console.log('GET:: Response from the server: ', response.data, typeof response.data);
      return response.data;
    })
    .catch(function (response) {
      console.log(response);
    })
}