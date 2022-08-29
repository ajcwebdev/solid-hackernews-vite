import './index.css';
import { render } from "solid-js/web"
import { Router, useRoutes, Link } from "solid-app-router"
import routes from "./routes"

const Outlet = useRoutes(routes)

render(
  () => (
    <Router routes={routes} root={process.env.PUBLIC_URL}>
      <header class="header">
        <nav class="inner">
          <Link href="/">
            <strong>HN</strong>
          </Link>
          <Link href="/new">
            <strong>New</strong>
          </Link>
          <a class="github" href="http://github.com/solidjs/solid" target="_blank" rel="noreferrer">
            Built with Solid
          </a>
        </nav>
      </header>
      <Outlet />
    </Router>
  ),
  document.body
)