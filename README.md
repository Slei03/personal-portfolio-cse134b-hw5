# personal-portfolio-cse134b

Deployed Site: https://sallyleiajax.netlify.app/

Name: Sally Lei  
PID: A16038154

HW5 Notes: 
- Assumed id to be unique in storage, and so, id is required for POST (assuming a need for post since unable to track id's "stored"), PUT, and DELETE
    - For GET and DELETE requests, only id is used to query because id is assumed to be unique
    - id not required for GET as get would just get page/all entries when id is not specified.

- Added date for POST requests only (as specified in instructions);
    - Since date is not shown to user and is only appended when POST is made, all other requests do not use date

- Allowed for empty inputs for article title and article name since HTTP requests can have data properties be empty

