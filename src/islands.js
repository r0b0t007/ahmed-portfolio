// Ids of the two hydrated islands — shared by App.jsx (markup) and main.jsx (hydration).
export const ISLAND = { header: 'island-header', contact: 'island-contact' }

// Fired on window by the contact island once React has attached its handlers (Contact.jsx), which
// is later than hydrateRoot returning: hydration finishes asynchronously. main.jsx holds a submit
// made before then and sends it again on this event.
export const CONTACT_READY = 'island-contact:ready'
