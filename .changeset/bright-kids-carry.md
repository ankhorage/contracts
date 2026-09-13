---
'@ankhorage/contracts': major
---

Require compute adapters to implement `inspectAsync` and return an `InfraComputeSnapshot` without
creating, updating, or deleting resources. `ensureAsync` now returns the same canonical snapshot
shape.

This separates read-only target discovery from reconciliation so `infra plan`, `infra generate`,
and validation can resolve existing portable targets without invoking a mutating lifecycle method.
Compute-adapter consumers must add `inspectAsync(context, selection)` before upgrading.
