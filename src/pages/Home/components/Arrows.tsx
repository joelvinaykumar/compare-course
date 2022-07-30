import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd"
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons"

import { VisibilityContext } from "react-horizontal-scrolling-menu";

type ArrowProps = {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}

const Arrow = ({
  children,
  disabled,
  onClick
}: ArrowProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
      }}
    >
      {children}
    </div>
  );
}

const LeftArrow = () => {

  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  
  useEffect(() => {

    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

const RightArrow = () => {

  const {
    isLastItemVisible,
    scrollNext,
    visibleItemsWithoutSeparators
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <div style={{ position: "relative", bottom: "-50%"  }}>
      <RightCircleFilled disabled={disabled} onClick={() => scrollNext()} style={{fontSize: 30}} />
    </div>
  );
}

export {
  LeftArrow,
  RightArrow
}