# Taskr

Taskr is a web platform used by roommates to make their lives easier.

Test Cases:
1. Get all Users - This test creates 2 mock Users and tests if the length of User.find().
Expected: 2, Received: 2

2. Create an Apartment - This test creates an Apartment with Apartment.create() and checks if its name matches the expected value.
Expected: Atrium, Received: Atrium

3. Edit an Apartment - This test finds an Apartment by id, constructs a new Apartment object, updates the original Apartment object with Apartment.findOneAndUpdate(), and checks the name.
Expected: Red Roebs, Received: Red Roebs

4. Add ChoreListItem - This test creates a User object, finds the User object that matches the first name and last name passed in, creates a ChoreListItem with that User's id passed in to the user field, and checks the user field.
Expected: 1, Received: 1

5. Delete ChoreListItem - This test creates a ChoreListItem, deletes it using ChoreListItem.delete(), and checks the length of ChoreListItem.
Expected: 0, Received: 0
