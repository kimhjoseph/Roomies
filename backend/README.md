To start the server independently of the frontend, run `nodemon server`.

Test Cases:

1. Signup - This test creates a test user to be used for all tests. The request body to /signup sets Test as first name, User as last name, test@gmail.com as email, and test as password.
Checks for a 201 status code.

2. Login - This test is in the beforeEach hook for all other tests. It passes the email and password from Signup into the request body to /login and sets the authenticated session to the test session (session with credentials) retrieved from the call. We make all subsequent requests with this authenticated session to be able to access the logged in user's data.
Checks for a 201 status code.

2. Create an Apartment - This test creates an Apartment with a get request to /apartment/create.
Checks for a 200 status code.

3. Join an Apartment - This test passes the sample code 'vu78p' into the request body to /apartment/join to join that apartment.
Checks for a 201 status code.

4. Get Users - This test gets all User items for an apartment with a get request to /user/get.
Checks for 200 status code.

5. Update Status - This test passes the status "Away" into the request body to /user/edit_info to update the user status.
Checks for 201 status code.

6. Add Chore Item - This test passes the name Test User, description Clean, and days 5 into the request body to /choreitem/add.
Checks for 201 status code.

7. Get Chore Items - This test gets all ChoreListItem items for an apartment with a get request to /choreitem/get_all_items.
Checks for 200 status code.

8. Delete Chore Items - This test deletes all ChoreListItems for an apartment with a delete request to /choreitem/delete_all_items.
Checks for 200 status code.

9. Add Shopping List Item - This test passes the people [Test User], item Bananas, and description 3 yellow ones! into the request body to /shoppingitem/add.
Checks for 201 status code.

10. Get Shopping List Items - This test gets all ShoppingListItems for an apartment with a get request to /shoppingitem/get.
Checks for 200 status code.