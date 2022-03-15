import React, { useEffect, useState } from "react";
import {
  SidebarFormContainer,
  Spiner,
  SelectorTitle,
  WrapperContainer,
} from "./sidebarformstyles";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import CustomSlider from "../../Slider";
import ImageFetcher from "../../SlideShow/ImageFetcher";

import { useSelector, useDispatch } from "react-redux";
import { updateCOGURI } from "../../../store/reducers/reducer";
import {
  loadSidebarControls,
  getSpecieInfo,
} from "../../../services/apiService";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import GroupedSelect from "../../CustomSelector/GroupingSelector";
import Selector from "../../CustomSelector/Selector";
import {
  createSelectorModel,
  createSliderList,
  groupingAndSortList,
} from "../../../utils/helper";

function SidebarForms(props) {
  const generalState = useSelector((state) => state.reducerState);
  const dispatch = useDispatch();

  let [state, setState] = React.useState({
    in_year: 0,
    in_species: "ABIE.BAL",
    in_scenario: "baseline_BudwormBaselineFire",
  });

  const [play, setPlay] = useState(false);
  const [intervalID, setIntervalID] = useState(0);

  const scenarios = [
    {option: 'baseline_BudwormBaselineFire', value: 'Baseline'},
    {option: 'baseline_BudwormBaselineFireBaselineHarvest', value: 'Baseline - Baseline Harvest'},
    {option: 'RCP45_GrowthBudwormBaselineFire', value: 'RCP45 - Baseline Fire'},
    {option: 'RCP85_GrowthBudwormBaselineFire', value: 'RCP85 - Baseline Fire'},
    {option: 'RCP45_GrowthBudwormProjectedFire', value: 'RCP45 - Projected Fire'},
    {option: 'RCP85_GrowthBudwormProjectedFire', value: 'RCP85 - Projected Fire'},
    {option: 'RCP45_GrowthBudwormBaselineFireBaselineHarvest', value: 'RCP45 - Baseline Fire - Baseline Harvest'},
    {option: 'RCP85_GrowthBudwormBaselineFireBaselineHarvest', value: 'RCP85 - BaselineFire - Baseline Harvest'},
    {option: 'RCP45_GrowthBudwormProjectedFireBaselineHarvest', value: 'RCP45 - Projected Fire - Baseline Harvest'},
    {option: 'RCP85_GrowthBudwormProjectedFireBaselineHarvest', value: 'RCP85 - Projected Fire - Baseline Harvest'},
  ]

  const species = [
    {option: 'ABIE.BAL', value: 'Abies balsamea'},
    {option: 'ACER.RUB', value: 'Acer rubrum'},
    {option: 'ACER.SAH', value: 'Acer saccharum'},
    {option: 'BETU.ALL', value: 'Betula alleghaniensis'},
    {option: 'BETU.PAP', value: 'Betula papyrifera'},
    {option: 'FAGU.GRA', value: 'Fagus grandifolia'},
    {option: 'LARI.LAR', value: 'Larix laricina'},
    {option: 'PICE.GLA', value: 'Picea glauca'},
    {option: 'PICE.MAR', value: 'Picea mariana'},
    {option: 'PICE.RUB', value: 'Picea rubens'},
    {option: 'PINU.BAN', value: 'Pinus banksiana'},
    {option: 'PINU.RES', value: 'Pinus resinosa'},
    {option: 'PINU.STR', value: 'Pinus strobus'},
    {option: 'POPU.TRE', value: 'Populus tremuloides'},
    {option: 'QUER.RUB', value: 'Quercus rubra'},
    {option: 'THUJ.SPP.ALL', value: 'Thuja spp.'},
    {option: 'TSUG.CAN', value: 'Tsuga canadensis'},
    {option: 'TotalBiomass', value: 'Total biomass'}
  ]
 /*const years = [
    {label: "2020", value: 0},
    {label: "2030", value: 100*1/13},
    {label: "2040", value: 100*2/13},
    {label: "2050", value: 100*3/13},
    {label: "2060", value: 100*4/13},
    {label: "2070", value: 100*5/13},
    {label: "2080", value: 100*6/13},
    {label: "2090", value: 100*7/13},
    {label: "2100", value: 100*8/13},
    {label: "2110", value: 100*9/13},
    {label: "2120", value: 100*10/13},
    {label: "2130", value: 100*11/13},
    {label: "2140", value: 100*12/13},
    {label: "2150", value: 100*13/13},
  ]*/ 

  const years = [
    {value: 0},
    {value: 100*1/13},
    {value: 100*2/13},
    {value: 100*3/13},
    {value: 100*4/13},
    {value: 100*5/13},
    {value: 100*6/13},
    {value: 100*7/13},
    {value: 100*8/13},
    {value: 100*9/13},
    {value: 100*10/13},
    {value: 100*11/13},
    {value: 100*12/13},
    {value: 100*13/13},
  ] 


  /**
   *
   * @param {*} selectObj
   */
  const selectFormValuesChanged = (selectObj) => {
        let newState = {...state}
        console.log(selectObj)
        if (selectObj.selectorId === "species") {
          newState.in_species=selectObj.value
        } else if(selectObj.selectorId === "years") {
          newState.in_year = selectObj.value
        } else if(selectObj.selectorId === "scenarios") {
          newState.in_scenario = selectObj.value
        }
        setState(newState);
        dispatch(updateCOGURI(newState.in_scenario,newState.in_species,Math.round((0.1*newState.in_year*13))))
  }


  let playTimeSeries = () => {
    if(!play){
     let newState=state
     setIntervalID(setInterval( () => {
        let yr = newState.in_year
        let new_yr=0
        if(yr===100){
          new_yr=0
        }else{
          new_yr=yr+(100/13)
        }
        newState = {
            ...state,
            in_year: new_yr,
          };
        setState(newState);
        dispatch(updateCOGURI(newState.in_scenario,newState.in_species,Math.round((0.1*newState.in_year*13))))
      }, 1500));
    }else{
      clearInterval(intervalID)
    }
    setPlay(!play)
    console.log(play)
  }

  return (
    <SidebarFormContainer>
      <WrapperContainer>
        <SelectorTitle>Espèce</SelectorTitle>
        <Selector
          selectorList={species}
          selectorId={"species"}
          onValueChange={selectFormValuesChanged}
        />
      </WrapperContainer>

      <WrapperContainer>
        <SelectorTitle>Scénario climatique</SelectorTitle>
        <Selector
          selectorList={scenarios}
          selectorId={"scenarios"}
          onValueChange={selectFormValuesChanged}
        />
      </WrapperContainer>
      <Box sx={{
        width: "80%",
        "margin-top": "30px"
      }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CustomSlider inline selectorId={"years"} notifyChange={selectFormValuesChanged} values={years} value={state.in_year}/>
      </Grid>
        <Grid item xs={1}>
          <IconButton variant="contained" onClick={playTimeSeries} size="large" sx={{
            height: "30px"
          }}>
          {!play && <PlayCircleIcon size={"large"} />}
          {play && <StopCircleIcon size={"large"}/>}
        </IconButton>
        </Grid>
      </Grid>
      </Box>
    </SidebarFormContainer>
  );
}

export default SidebarForms;
