# Updates:
- I created a new table called dashboard links two tables together(products, orders).
- Created a db-migrate table called dashboard by running the db-migrate up you will be able to created in your database.
- Created dashboard.ts file in services directory, added its functions and exported the whole class.
- Created dashboard.route.ts file inside src/routes directory
- Created dashboardSpec.ts file inside src/tests directory to test dashboard's functions.

# Questions :
1- in src/tests/customerSpec.ts i tried a lot of things to return the values but it was returning undefined 
in this code:

it('expect a value of first row from retrieveCustomerData to be 1,test1,test1@yahoo,1234', async () => {
    await customer.retrieveCustomerData().then((data) => {
      const firstRow = Object.values(data[0] as object);
      expect(firstRow).toEqual([1, 'test1', 'test1@yahoo', '1234']);
    });
  });

  it('expect to return customer name test1 from retrieveOneCustomer function', async () => {
    await customer.retrieveOneCustomer(1).then((mydata) => {
      const row = Object.values(mydata);
      expect(row[1]).toEqual('test1');
    });
  });
  

  i almost tried everything to retrieve specific data but i faild evertime.. but this code works.
  i this the best code here?? or i should use something else?
  what code would you add here in this very situation???