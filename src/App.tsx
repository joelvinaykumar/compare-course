import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.dark.less'
import 'antd/dist/antd.less';
import 'react-loading-skeleton/dist/skeleton.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatedRoutes } from './components';

const App = () => {

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
