import React from "react";

import {
  SiderTitleContainer,
  SiderContainer,
  Description,
  Title,
} from "./sidebarstyle";
import "./sidebar.css";
import SidebarForms from "./SidebarForms";

function Sidebar(props) {
  return (
    <SiderContainer>
      <SiderTitleContainer>
        <Title>
          <div className="dash-icon icon-bq_icons_tree" />
          <div className="dash-title">Effets des changements climatiques sur les forêts</div>
        </Title>

        <Description>
          Évolution des envelopes climatiques par espèces pour différents
          scénarios projetés
        </Description>
      </SiderTitleContainer>
      <SidebarForms />
    </SiderContainer>
  );
}

export default Sidebar;
