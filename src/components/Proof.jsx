import { proofItems as items } from '../content/proof'
import { productsPhrase } from '../content/products'
import { numberOf } from '../lib/sections'
import { Clause, SpecList } from './Doc'
import { proofRows } from './rows'

const Proof = () => (
  <Clause
    type="home" id="proof"
    title="Don’t take my word for it." accent="Take two minutes."
    lead={`I won’t show you client logos I haven’t earned. I’ll show you things you can look up: ${productsPhrase}, this site, its source, and the track record behind it.`}
  >
    <SpecList prefix={numberOf('home', 'proof')} rows={proofRows(items)} />
  </Clause>
)

export default Proof
