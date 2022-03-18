import React from "react";
import { RightContent } from "../../appStyles.js";
import MSMaps from "../MSMaps";
import Legend from "../Legend";
import { colors } from "../../styles";

function RightContentGroup() {
  return (
    <RightContent>
      <MSMaps />
      <Legend
        absolute={true}
        location={"bottom-right"}
        bottom={20}
        right={10}
        items={[
          { text: "<10", color: colors.legend1 },
          { text: "10-25", color: colors.legend2 },
          { text: "25-40", color: colors.legend3 },
          { text: "40-55", color: colors.legend4 },
          { text: "55-70", color: colors.legend5 },
          { text: "70-85", color: colors.legend6 },
          { text: "85-100", color: colors.legend7 }
        ]}
        colorClass={"white-background"}
        title={"Biomasse (tonnes/ha)"}
      />
    </RightContent>
  );
}

export default RightContentGroup;
