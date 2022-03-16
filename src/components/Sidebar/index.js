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
          Modélisation de la biomasse des principales espèces d'arbres au Québec en fonction de différents scénarios climatiques et d'aménagement.  
          <a style={{color:'#ffffff'}} href="https://link.springer.com/article/10.1007/s10980-021-01241-7"> Référence</a>
        </Description>
      </SiderTitleContainer>
      <SidebarForms />
    </SiderContainer>
  );
}

export default Sidebar;
