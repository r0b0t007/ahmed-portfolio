import ThisSite from './work/ThisSite'
import { workLogs } from '../content/work'

/**
 * Each build log is its own component (long-form prose with links and code), keyed by the slug
 * in src/content/work.js. A slug with no component here fails the build at prerender.
 */
const LOGS = { 'this-site': ThisSite }

const WorkPage = ({ slug }) => {
  const Log = LOGS[slug]
  if (!Log) throw new Error(`WorkPage: no component for build log "${slug}"`)
  return <Log name={workLogs.find(w => w.slug === slug).name} />
}

export default WorkPage
