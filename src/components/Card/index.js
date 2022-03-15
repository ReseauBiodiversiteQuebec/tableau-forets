import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardContainer,
  DetailContainer,
  BigText,
  SmallText,
} from "./cardstyle";
import Grid from "@mui/material/Grid";
import { numberFormater } from "../../utils/helper";

const Detail = ({ bigText = "fr.", smallText = "" }) => {
  return (
    <DetailContainer>
      <BigText>{bigText}</BigText>
      <SmallText>{smallText}</SmallText>
    </DetailContainer>
  );
};

function CustomCard(props) {
  const { current_area, projected_area, debt, credit } = props;
  return (
    <CardContainer>
      <Card>
        <CardContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Grid item xs={6}>
              <Detail
                smallText={"Superficie actuelle"}
                bigText={`${numberFormater(current_area)} km²`}
              />
            </Grid>
            <Grid item xs={6}>
              <Detail
                smallText={"Superficie projetée"}
                bigText={`${numberFormater(projected_area)} km²`}
              />
            </Grid>
            <Grid item xs={6}>
              <Detail
                smallText={"Dette"}
                bigText={`${numberFormater(debt)} km²`}
              />
            </Grid>
            <Grid item xs={6}>
              <Detail
                smallText={"Crédit"}
                bigText={`${numberFormater(credit)} km²`}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CardContainer>
  );
}

export default CustomCard;
