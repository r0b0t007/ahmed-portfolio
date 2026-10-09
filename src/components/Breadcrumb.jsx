/**
 * Home › page, matching the BreadcrumbList in src/content/routes.js. Two levels, because there is
 * no index page between the homepage and a service page or build log.
 */
export const Breadcrumb = ({ name }) => (
  <nav aria-label="Breadcrumb" className="crumbs">
    <ol>
      <li><a href="/">Home</a></li>
      <li aria-current="page">{name}</li>
    </ol>
  </nav>
)
