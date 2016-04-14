### Node file size analyzer

This project takes a file, uploaded through a form, and returns the file size.
Uses the multiparty module.  The idea was to do this without Express.

The project was changed from taking in raw form data and displaying the file
size on a redirect to handling the upload from a formData object and
returning a JSON object with the file size.
