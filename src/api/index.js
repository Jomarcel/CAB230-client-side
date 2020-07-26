import axios from "axios";
import * as moment from "moment";
const baseUrl = "http://131.181.190.87:3000/stocks/symbols";
const symbolUrl = "http://131.181.190.87:3000/stocks/";

/*
 * All available stocks data, optionally filtered by industry name.
 * Route: non-authenticated
 */
export const fetchApiData = async (query) => {
  let dynamicUrl = baseUrl;
  if (query) {
    dynamicUrl = `${baseUrl}?industry=${query}`;
  }
  // Extract the data and its properties from the reponse
  const { data } = await axios.get(dynamicUrl).catch((error) => {
    if (error.response) {
      // If server responded with a status other than 200 range logged the error to the console
      console.log(error.response.data);
      console.log(`Error code is: ${error.response.status}`);
      console.log(`Status text is: ${error.response.statusText}`);
    }
  });
  const modifiedData = data.map((stock) => ({
    name: stock.name,
    symbol: stock.symbol,
    industry: stock.industry,
  }));
  return modifiedData;
};
/*
 * All stocks data
 * Route: non-authenticated
 */
export const baseApiData = async () => {
  // Extract the data and its properties from the reponse
  const { data } = await axios.get(baseUrl).catch((error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  });

  const modifiedData = data.map((stock) => ({
    name: stock.name,
    symbol: stock.symbol,
    industry: stock.industry,
  }));
  return modifiedData;
};
/*
 * Stocks data with symbols filter.
 * Route: non-authenticated
 */
export const fetchSymbols = async (query) => {
  let dynamicUrl = baseUrl;
  if (query) {
    dynamicUrl = `${symbolUrl}${query}`;
  }
  try {
    const {
      // Extract the data and its properties from the response
      data: { name, industry, timestamp, high, low, volumes, open, close },
    } = await axios.get(dynamicUrl).catch((error) => {
      console.dir(error);
      if (error.response) {
        // server responded with a status other than 200 range
        console.log(error.response.data);
        console.log(`Status code: ${error.response.status}`);
        console.log(`Message: ${error.message}`);
      }
    });
    const formatedDateString = moment(timestamp).format("l").toString();
    const formatedVolumes = volumes.toLocaleString();
    const modifiedData = {
      name,
      // symbol,
      industry,
      timestamp: formatedDateString,
      high: `$${high}`,
      low: `$${low}`,
      volumes: formatedVolumes,
      open: `$${open}`,
      close: `$${close}`,
    };
    const newData = Object.values({ modifiedData }); //convert object to an array
    return newData;
  } catch (error) {
    console.log(error);
  }
};

/*
 * Search data by symbol.
 * Route: Authenticated
 */

export const loadData = async (query) => {
  let dynamicUrl = symbolUrl;
  if (query) {
    // check if there is input

    dynamicUrl = `${symbolUrl}authed/${query}`;
  }
  /* if a token is provided, it will be used, otherwise do nothing  */
  if (!localStorage.token) return;
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    accept: "application.json",
    Authorization: `Bearer ${token}`,
  };
  // Extract the data and its properties from the reponse
  const {
    data: {
      name,
      symbol,
      industry,
      timestamp,
      high,
      low,
      volumes,
      open,
      close,
    },
  } = await axios.get(dynamicUrl, { headers }).catch((error) => {
    if (error.response) {
      // server responded with a status other than 200 range
      console.log(error.response.data);
      console.log(error.response.status);
    }
    // console.log({ headers });
  });

  const modifiedData = {
    name,
    symbol,
    industry,
    timestamp: moment(timestamp).format("l").toString(),
    high: `${high}`,
    low: `${low}`,
    volumes: volumes,
    open: `${open}`,
    close: `${close}`,
  };
  const newData = Object.values({ modifiedData }); //convert object to an array
  return newData;
};
