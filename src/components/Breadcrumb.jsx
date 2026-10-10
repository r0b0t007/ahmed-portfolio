import { useContent } from '../lib/content-context'

/**
 * Home › page, matching the BreadcrumbList in src/content/routes.js. Two levels, because there is
 * no index page between the homepage and a service page or build log. "Home" is the homepage of
 * the page's own language.
 */
export const Breadcrumb = ({ name }) => {
  const { ui } = useContent()
  return (
    <nav aria-label={ui.crumbLabel} className="crumbs">
      <ol>
        <li><a href={ui.home}>{ui.crumbHome}</a></li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  )
}
