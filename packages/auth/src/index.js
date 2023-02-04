import('./bootstrap');

// this special import() gives webpack the ability to load
// imports asynchronously. so we don't get the
// Uncaught Error: Shared module is not available for eager consumption:
// in the browser console