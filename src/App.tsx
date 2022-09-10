/* eslint-disable no-template-curly-in-string */
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/antd.dark.less";
import "antd/dist/antd.less";
import "react-loading-skeleton/dist/skeleton.css";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AnimatedRoutes } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        form={{
          validateMessages: {
            types: {
              email: "${label} should be a valid email address"
            },
            default: "Validation error on field ${name}",
            required: "${label} missing",
            enum: "${label} must be one of [${enum}]",
          }
        }}
      >
        <AnimatedRoutes />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
