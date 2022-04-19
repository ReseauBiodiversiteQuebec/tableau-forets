import React from "react";
import { RightContent } from "../../appStyles.js";
import MSMaps from "../MSMaps";
import Legend from "../Legend";
import { colors } from "../../styles";

function RightContentGroup(props) {
  const { width, height } = props;
  const realWith = width > 768 ? width - 350 : width;
  return (
    <RightContent style={{ width: `${realWith}px` }}>
      {width !== 0 && height !== 0 && <MSMaps />}
      <Legend
        absolute={true}
        location={"bottom-right"}
        bottom={20}
        right={10}
        items={[
          { text: "<16", color: colors.legend1 },
          { text: "16-32", color: colors.legend2 },
          { text: "32-48", color: colors.legend4 },
          { text: "48-64", color: colors.legend5 },
          { text: "64-80", color: colors.legend7 },
        ]}
        colorClass={"white-background"}
        title={"Biomasse (tonnes/ha)"}
      />
    </RightContent>
  );
}

export default RightContentGroup;
