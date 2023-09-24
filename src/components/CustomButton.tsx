import { Button } from "antd"
import styled from "styled-components"
import theme from "../utils/theme"


export default styled(Button)<{ width?: number }>`
  filter: drop-shadow(1px 7px 10px ${theme.primaryRgba});
  // width: ${props => props?.width || 100}%;
`