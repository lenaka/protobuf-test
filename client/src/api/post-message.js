import * as axios from "axios";

export function postMessage(binaryData) {
  const httpClient = axios.create();
  return httpClient.post('http://localhost:3001/api/messages', binaryData,
    {
      responseType: 'arraybuffer',
      headers: {'Content-Type': 'application/octet-stream'}
    }
  ).then((response) => {
    console.log('POST:: Response from the server: ', response.data, typeof response.data);
    return response.data;
  })
    .catch(function (response) {
      console.log(response)
    })
}