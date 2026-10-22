import { buildEdgePolicy, readBuiltPolicies } from './csp-policy.mjs'

const target = process.argv[2] ?? 'dist'

try {
  console.log(buildEdgePolicy(await readBuiltPolicies(target)))
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
