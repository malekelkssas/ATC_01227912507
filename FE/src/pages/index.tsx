import { PagesRoutesConstants } from '@/utils/constants';
import { Navigate } from 'react-router-dom';

const Index = () => {
  return <Navigate to={PagesRoutesConstants.EVENTS} replace />;
};

export default Index;