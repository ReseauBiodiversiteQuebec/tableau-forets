import { SETSEARCHSTATUS, SETENVELOPS, SETCOGURI, SETCURRENTLAYER } from "./types";
import { get_envelopes, get_summary } from "../../services/apiService";

const initialState = {
  features: [],
  fetching: false,
  cog_uri: "https://object-arbutus.cloud.computecanada.ca/bq-io/io/forets-cc-landis/baseline_BudwormBaselineFire_ABIE.BAL_0_merged.tif",
  current_layer: {}
};

const mapReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SETSEARCHSTATUS:
      return {
        ...state,
        fetching: payload.fetching,
      };
    case SETENVELOPS:
      return {
        ...state,
        features: payload.features,
        fetching: payload.fetching,
        summary: payload.summary,
      };
    case SETCOGURI:
      return {
        ...state,
        cog_uri: payload.cog_uri
      };
    case SETCURRENTLAYER:
      return {
        ...state,
        current_layer: payload.current_layer
      };
    default:
      return state;
  }
};

export default mapReducer;

/**
 *
 * @param {*} status
 * @returns
 */
export const updateFetchingStatus = (status) => async (dispatch) => {
  dispatch({ type: SETSEARCHSTATUS, payload: { fetching: status } });
};


/**
 *
 * @param {*} status
 * @returns
 */
export const updateCurrentLayer = (status) => async (dispatch) => {
  dispatch({ type: SETCURRENTLAYER, payload: { fetching: status } });
};



/**
 *
 * @param {*} status
 * @returns
 */
export const updateCOGURI = (scenario_climate,scenario_fire,scenario_harvest,species,year) => async (dispatch) => {
  let pre=''
  if (scenario_climate === 'baseline'){
    pre='Budworm'
  }else{
    pre='GrowthBudworm'
  }
  const uri = "https://object-arbutus.cloud.computecanada.ca/bq-io/io/forets-cc-landis/"+scenario_climate+"_"+pre+scenario_fire+scenario_harvest+"_"+species+"_"+year+"_merged.tif"
  dispatch({ type: SETCOGURI, payload: { cog_uri: uri } });
};



/**
 *
 * @param {*} params
 * @returns
 */
export const get_envelopes_from_db = (params) => async (dispatch) => {
  dispatch(updateFetchingStatus(true));

  const features = await get_envelopes(params);

  const current = features.filter(
    (feature) => feature.properties.category === "current",
  );
  const projected = features.filter(
    (feature) => feature.properties.category === "projected",
  );

  const summaryObj = {
    current_envelopes_id: current.length > 0 ? current[0].properties.id : 0,
    projected_envelopes_id:
      projected.length > 0 ? projected[0].properties.id : 0,
  };

  const summaryresponse = await get_summary(summaryObj);
  let summary =
    summaryresponse.length > 0
      ? summaryresponse[0]
      : {
          credit_area_sqm: 0,
          current_area_sqm: 0,
          debt_area_sqm: 0,
          projected_area_sqm: 0,
        };

  //const res = await fetchSpecieImage({ name: in_taxa_scientific_name });
  //console.log(res);

  dispatch({
    type: SETENVELOPS,
    payload: { fetching: false, features, summary },
  });
};
