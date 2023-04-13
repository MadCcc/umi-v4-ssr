import { Link, Outlet } from 'umi';
import styles from './index.less';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    setHydrating(false);
  }, []);

  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>

      <p>Layout {hydrating ? 'hydrating' : 'hydrated'}</p>
      <a href="#hydrate">Hash Change</a>
      <Outlet />
    </div>
  );
}
