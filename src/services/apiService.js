import axios from "axios";

/**
 * function used to create request param object
 * @param {*} baseURL
 * @param {*} headers
 * @param {*} params
 * @returns
 */
export const getRequestParams = (baseURL, headers, params = {}) => {
  return {
    baseURL: baseURL,
    responseType: JSON,
    headers: headers,
    params: params,
  };
};

/**
 * functhion used to make any custom request
 * @param {*} url
 * @param {*} paramObj
 * @returns
 */
export const makeRequest = async (url, paramObj) => {
  let result;
  try {
    result = await axios.get(url, paramObj);
  } catch (error) {
    result = { data: null };
  }

  return result;
};

/**
 * functhion used to make any custom request
 * @param {*} url
 * @param {*} paramObj
 * @returns
 */
export const makePostRequest = async (url, { params, baseURL, headers }) => {
  let result;
  try {
    result = await axios.post(baseURL + url, params, {
      headers,
    });
  } catch (error) {
    result = { data: null };
  }

  return result;
};

/**
 *
 * @param {*} list
 * @returns
 */
const removeDoublesFromList = (list) => [...new Set(list)];

/**
 * return the taxa names for selector
 */
export const get_taxa_scientific_name = async () => {
  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Accept-Profile": "api",
    },
    {
      select: "taxa_scientific_name",
    },
  );

  let result = await makeRequest("/envelopes", paramObj);

  return removeDoublesFromList(
    result.data ? result.data.map((item) => item.taxa_scientific_name) : [],
  );
};

/**
 *
 * @returns
 */
export const get_scenarios = async () => {
  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Accept-Profile": "api",
    },
    {
      select: "scenario",
      category: "eq.projected",
    },
  );

  let result = await makeRequest("/envelopes", paramObj);

  return removeDoublesFromList(
    result.data ? result.data.map((item) => item.scenario) : [],
  );
};

/**
 *
 * @returns
 */
export const get_year_slider = async () => {
  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Accept-Profile": "api",
    },
    {
      select: "year",
    },
  );

  let result = await makeRequest("/envelopes", paramObj);

  return removeDoublesFromList(
    result.data ? result.data.map((item) => item.year) : [],
  ).sort();
};

/**
 *
 */
export const loadSidebarControls = async () => {
  const taxaReq = get_match_taxa_list();
  const scenarioReq = get_scenarios();
  const yearSlider = get_year_slider();

  const reponse = await Promise.allSettled([taxaReq, scenarioReq, yearSlider]);

  const taxaList = reponse[0].value.map((item) => {
    return {
      ...item,
      option: item.valid_scientific_name,
      value: item.valid_scientific_name,
    };
  });

  return {
    scenarios: reponse[1].value,
    years: reponse[2].value,
    taxaList,
  };
};

/**
 *
 * @param {*} in_taxa_scientific_name
 * @param {*} in_year
 * @param {*}in_scenario
 */
export const get_envelopes = async ({
  in_taxa_scientific_name,
  in_year,
  in_scenario,
}) => {
  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Accept-Profile": "api",
    },
    {
      in_taxa_scientific_name,
      in_year,
      in_scenario,
    },
  );

  let result = await makeRequest("/rpc/get_compared_envelopes", paramObj);
  return result.data ? result.data.features : [];
};

/**
 *
 * @param {*} current_envelopes_id
 * @param {*} projected_envelopes_id
 * @returns
 */
export const get_summary = async ({
  current_envelopes_id,
  projected_envelopes_id,
}) => {
  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Accept-Profile": "api",
    },
    {
      current_envelopes_id,
      projected_envelopes_id,
    },
  );

  let result = await makeRequest("/rpc/compare_envelopes", paramObj);
  return result.data ? result.data : [];
};

/**
 *
 * @param {*} name
 */
export const get_match_taxa = async ({ name }) => {
  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL_ATLAS,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Content-Profile": "api",
      "Accept-Profile": "api",
    },
    { taxa_name: `${name}` },
  );

  let result = await makeRequest("/rpc/match_taxa", paramObj);
  return result.data || [];
};

/**
 *
 * @param {*} name
 */
export const get_match_taxa_list = async () => {
  const taxalist = await get_taxa_scientific_name();

  let paramObj = getRequestParams(
    process.env.REACT_APP_BASEURL_ATLAS,
    {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
      "Content-Profile": "api",
      "Accept-Profile": "api",
      select: "vernacular_en,vernacular_fr,group_en,group",
    },
    { taxa_names: taxalist },
  );

  let result = await makePostRequest("/rpc/match_taxa_list", paramObj);
  return result.data || [];
};

/**
 *
 * @param {*} data
 * @returns
 */
const filterSpeciesWiki = ({ data, name }) => {
  const split = name.split(" ");

  let result = [];
  if (typeof data !== "string" && data.hasOwnProperty("query")) {
    result = Object.values(data.query.pages)
      .filter((page) => {
        const imageinfo = page.imageinfo.filter((item) => {
          return (
            item.thumbmime.indexOf("jpeg") !== -1 &&
            (item.thumburl.indexOf(".jpg") !== -1 ||
              item.thumburl.indexOf(".JPG") !== -1) &&
            item.url.toLowerCase().indexOf(split[0].toLowerCase()) !== -1
          );
        });
        return imageinfo.length > 0;
      })
      .map(function (value) {
        const imageinfo = value.imageinfo[0];

        return {
          url: imageinfo.url,
          thumburl: imageinfo.thumburl,
          comment: imageinfo.comment,
          name,
          height: imageinfo.height,
          width: imageinfo.width,
        };
      });
  }

  return result;
};

/**
 *
 * @param {*} paramObj
 */
export const getImagesFromSpeciesMediaWikimedia = async (paramObj) => {
  let result = await axios.get(
    `https://species.wikimedia.org/w/api.php`,
    paramObj,
  );

  return filterSpeciesWiki({ data: result.data, name: paramObj.params.titles });
};

/**
 * fetch an image for a given specie's name (image source species.wikimedia)
 * @param {*} param
 * @returns
 */
export const fetchSpecieImage = async ({ name }) => {
  const speciesBaseUrl = "https://species.wikimedia.org";
  const autoCompleteParamObj = getRequestParams(
    speciesBaseUrl,
    { Accept: "*/*" },
    {
      action: "query",
      generator: "images",
      prop: "imageinfo",
      gimlimit: 5,
      redirects: 1,
      titles: name,
      format: "json",
      iiurlwidth: "500",
      origin: "*",
      iiprop:
        "timestamp|user|userid|comment|canonicaltitle|url|size|dimensions|mime|thumbmime|mediatype|bitdepth",
    },
  );

  return await getImagesFromSpeciesMediaWikimedia(autoCompleteParamObj);
};

/**
 *
 * @param {*} name
 * @returns
 */
export const getSpecieInfo = async ({ name }) => {
  let data = {
    valid_scientific_name: "",
    qc_status_en: "Espece à statut",
    qc_status_fr: "Espece à statut",
    vernacular_en: "",
    vernacular_fr: "",
  };

  const datarequest = get_match_taxa({ name });

  const imageRequest = fetchSpecieImage({ name });
  const result = await Promise.allSettled([datarequest, imageRequest]);

  const dataResp = result[0].value;
  data = dataResp.length > 0 ? { ...data, ...dataResp[0] } : data;

  const imageResp = result[1].value;
  let image = imageResp.length > 0 ? imageResp[0] : undefined;

  return { image, data };
};
