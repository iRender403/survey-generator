import { Link } from 'react-router-dom';
import Layout from './Layout.tsx';

export default function AdvancedGroupView() {
  return (
    <Layout>
      <Link className="link-item mb-15" to="/some-path">
        评价/打分
      </Link>
      <Link className="link-item mb-15" to="/some-path">
        日期/时间
      </Link>
    </Layout>
  );
}
