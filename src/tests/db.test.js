const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017/", {
      useNewUrlParser: true,
    });
    db = await connection.db("users");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('test_collection');

    const mockUser = {name: 'John', rid: 'Doe'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({rid: 'Doe'});
    expect(insertedUser).toEqual(mockUser);
  });


  it('should delete from collection', async () => {
    const users = db.collection('test_collection');

    const mockUser = {rid: 'Doe'};
    await users.deleteOne(mockUser);

    const deleteUser = await users.findOne({rid: 'Doe'});
    expect(deleteUser).toEqual(null);
  });


});
