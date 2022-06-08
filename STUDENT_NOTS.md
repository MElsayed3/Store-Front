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