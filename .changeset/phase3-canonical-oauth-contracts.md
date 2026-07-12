---
'@ankhorage/contracts': major
---

Replace the optional URL-only OAuth adapter methods with one canonical provider-neutral OAuth capability that requires authorization start and callback completion, models transport cancellation and failures explicitly, and resolves successful OAuth sign-in to the existing `AuthSession` contract.
