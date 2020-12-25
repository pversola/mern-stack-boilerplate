db.createUser(
  {
    user: "user01",
    pwd: "mflv[1234",
    roles: [
      {
        role: "readWrite",
        db: "Test"
      }
    ]
  }
)