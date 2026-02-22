# Specification

## Summary
**Goal:** Implement PIN code-based auto-fill functionality with locked address fields across all registration forms.

**Planned changes:**
- Lock district, state, and nation fields as read-only in all address forms (Careers, Vendors, AmbulanceServices, NgoListing)
- Add post office name field to all address forms
- Auto-fill district, state, nation, and post office fields when PIN code is entered
- Update pinCodeLookup utility to return post office name from India Post API
- Ensure only PIN code field accepts manual input; all other location fields are auto-populated and read-only

**User-visible outcome:** Users can enter only their PIN code in registration forms, and district, state, nation, and post office name fields will automatically populate and remain locked, streamlining the address entry process.
