---
'@ankhorage/contracts': major
---

Add serializable Slot, typed Stack, Drawer, Tabs, Split View, and Custom navigator variants with matching structural validation.

This is a breaking contract change: the arbitrary navigator `options` bag is removed, Stack and Drawer options are now finite typed branches, custom tabs use strict presentation discriminants, and invalid or non-JSON custom configuration is rejected. No authored `options` values were found in the current canonical consumers; the major release prevents their existing `^10` ranges from receiving the narrowed contract automatically.
