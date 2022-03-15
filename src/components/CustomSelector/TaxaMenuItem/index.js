import React from "react";
import {
  TaxaItemContainer,
  TaxaItemSubTitle,
  TaxaItemTitle,
} from "./taxaitemstyle";
function TaxaMenuItem(props) {
  const { value, vernacular_fr } = props;
  return (
    <TaxaItemContainer>
      <TaxaItemTitle>{`${vernacular_fr || "none"}`}</TaxaItemTitle>
      <TaxaItemSubTitle>{value}</TaxaItemSubTitle>
    </TaxaItemContainer>
  );
}

export default TaxaMenuItem;
