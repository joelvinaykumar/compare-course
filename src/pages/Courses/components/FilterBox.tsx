import React from "react"
import { Typography, Checkbox } from "antd";
import styled from "styled-components";


type FilterBoxProps = {
  title: string,
  options: string[],
  getter: string[],
  setter: any,
}

const FilterBox: React.FC<FilterBoxProps> = ({ title, options, getter, setter }) => {
  
  return (
    <Container>
      <Typography.Title level={5}>{`Filter by ${title}`}</Typography.Title>
      <Checkbox.Group
        value={getter}
        onChange={(val: any) => setter(val)}
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 2,
        }}
        options={options}
      />
    </Container>
  )
};

export default FilterBox;

const Container = styled.div`
  margin-bottom: 20px;
`
