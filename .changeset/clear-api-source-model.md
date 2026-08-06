---
'@ankhorage/contracts': major
---

Replace the mixed REST, OpenAPI, GraphQL, and managed-API data-source kinds with an orthogonal API/database model. APIs now declare external/generated origin and REST/GraphQL protocol, while OpenAPI is optional REST description metadata. Preserve generated REST/CRUD desired state in a dedicated manifest registry and keep its normalized runtime data-source projection separate, with no speculative API-server generator adapter.
