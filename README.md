Practice Backend web development structure

Customer: "I want contact #5"
          ↓
Route: "Send this request to getContact()"
          ↓
Controller: getContact()
          ↓
Database: Find contact #5
          ↓
Controller: Return the result
          ↓
Customer receives response

In one sentence
The controllers folder contains the functions that execute the application's logic, process requests, interact with the database, and send responses back to the client.