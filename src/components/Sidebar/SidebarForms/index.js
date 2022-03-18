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
    in_scenario_climate: "baseline",
    in_scenario_fire: "BaselineFire",
    in_scenario_harvest: "",
  });

  const [play, setPlay] = useState(false);
  const [intervalID, setIntervalID] = useState(0);

  const scenarios_climate = [
    {option: 'baseline', value: 'Historique'},
    {option: 'RCP45', value: 'RCP45'},
    {option: 'RCP85', value: 'RCP85'}
  ]

  const scenarios_fire = [
    {option: 'BaselineFire', value: 'Feux historiques'},
    {option: 'ProjectedFire', value: 'Feux projetés'}
  ]


  const scenarios_harvest = [
    {option: '', value: 'Sans aménagement'},
    {option: 'BaselineHarvest', value: 'Aménagement écosystémique'}
  ]

  const species = [
    {option: 'ABIE.BAL', value: 'Abies balsamea', vernacular_fr: 'Sapin baumier'},
    {option: 'ACER.RUB', value: 'Acer rubrum', vernacular_fr: 'Érable rouge'},
    {option: 'ACER.SAH', value: 'Acer saccharum', vernacular_fr: 'Érable à sucre'},
    {option: 'BETU.ALL', value: 'Betula alleghaniensis', vernacular_fr: 'Bouleau jaume'},
    {option: 'BETU.PAP', value: 'Betula papyrifera', vernacular_fr: 'Bouleau à papier'},
    {option: 'FAGU.GRA', value: 'Fagus grandifolia', vernacular_fr: 'Hêtre à grande feuilles'},
    {option: 'LARI.LAR', value: 'Larix laricina', vernacular_fr: 'Mélèze laricin'},
    {option: 'PICE.GLA', value: 'Picea glauca', vernacular_fr: 'Épinette blanche'},
    {option: 'PICE.MAR', value: 'Picea mariana', vernacular_fr: 'Épinette noire'},
    {option: 'PICE.RUB', value: 'Picea rubens', vernacular_fr: 'Épinette rouge'},
    {option: 'PINU.BAN', value: 'Pinus banksiana', vernacular_fr: 'Pin gris'},
    {option: 'PINU.RES', value: 'Pinus resinosa', vernacular_fr: 'Pin rouge'},
    {option: 'PINU.STR', value: 'Pinus strobus', vernacular_fr: 'Pin blanc'},
    {option: 'POPU.TRE', value: 'Populus tremuloides', vernacular_fr: 'Peuplier faux-tremble'},
    {option: 'QUER.RUB', value: 'Quercus rubra', vernacular_fr: 'Chêne rouge'},
    {option: 'THUJ.SPP.ALL', value: 'Thuja occidentalis', vernacular_fr: 'Thuya occidental'},
    {option: 'TSUG.CAN', value: 'Tsuga canadensis', vernacular_fr: 'Pruche du canada'},
    {option: 'TotalBiomass', value: 'Biomasse totale'}
  ]

  const scenarios = [
    {option: 'baseline_BudwormBaselineFire', value: 'Climat historique - Feux historiques - Sans aménagement'},
    {option: 'baseline_BudwormBaselineFireBaselineHarvest', value: 'Climat historique - Feux historiques - Aménagement écoystémique'},
    {option: 'RCP45_GrowthBudwormBaselineFire', value: 'Climat RCP45 - Feux historiques - Sans aménagement'},
    {option: 'RCP85_GrowthBudwormBaselineFire', value: 'Climat RCP85 - Feux historiques - Sans aménagement'},
    {option: 'RCP45_GrowthBudwormProjectedFire', value: 'Climat RCP45 - Feux projetés - Sans aménagement'},
    {option: 'RCP85_GrowthBudwormProjectedFire', value: 'Climat RCP85 - Feux projetés - Sans aménagement'},
    {option: 'RCP45_GrowthBudwormBaselineFireBaselineHarvest', value: 'Climat RCP45 - Feux historiques - Aménagement écoystémique'},
    {option: 'RCP85_GrowthBudwormBaselineFireBaselineHarvest', value: 'Climat RCP85 - Feux historiques - Aménagement écoystémique'},
    {option: 'RCP45_GrowthBudwormProjectedFireBaselineHarvest', value: 'Climat RCP45 - Feux projetés - Aménagement écoystémique'},
    {option: 'RCP85_GrowthBudwormProjectedFireBaselineHarvest', value: 'Climat RCP85 - Feux projetés - Aménagement écoystémique'}
  ]

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
        } else if(selectObj.selectorId === "scenarios_climate") {
          newState.in_scenario_climate = selectObj.value
        } else if(selectObj.selectorId === "scenarios_fire") {
          newState.in_scenario_fire = selectObj.value
        } else if(selectObj.selectorId === "scenarios_harvest") {
          newState.in_scenario_harvest = selectObj.value
        }
        if(newState.in_scenario_climate === 'baseline'){
          newState.in_scenario_fire = 'BaselineFire' //No projected fires for baseline climate
        }
        setState(newState);
        dispatch(updateCOGURI(newState.in_scenario_climate, newState.in_scenario_fire, newState.in_scenario_harvest, newState.in_species, Math.round((0.1*newState.in_year*13))))
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
        dispatch(updateCOGURI(newState.in_scenario_climate, newState.in_scenario_fire, newState.in_scenario_harvest, newState.in_species,Math.round((0.1*newState.in_year*13))))
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
        <GroupedSelect
          elementList={species}
          selectorId={"species"}
          onValueChange={selectFormValuesChanged}
          value={state.in_species}
        />
      </WrapperContainer>

      <WrapperContainer>
        <SelectorTitle>Scénario climatique</SelectorTitle>
        <Selector
          selectorList={scenarios_climate}
          selectorId={"scenarios_climate"}
          onValueChange={selectFormValuesChanged}
          value={state.in_scenario_climate}
        />
      </WrapperContainer>
      <WrapperContainer>
        <SelectorTitle>Feux</SelectorTitle>
        <Selector
          selectorList={scenarios_fire}
          selectorId={"scenarios_fire"}
          onValueChange={selectFormValuesChanged}
          value={state.in_scenario_fire}
        />
      </WrapperContainer>
      <WrapperContainer>
        <SelectorTitle>Aménagement</SelectorTitle>
        <Selector
          selectorList={scenarios_harvest}
          selectorId={"scenarios_harvest"}
          onValueChange={selectFormValuesChanged}
          value={state.in_scenario_harvest}
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
