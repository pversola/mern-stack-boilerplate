# Config DB

script create user

```
db.createUser(
  {
    user: "dev",
    pwd: "mflv[1234",
    roles: [
      {
        role: "readWrite",
        db: "<DB_NAME>"
      }
    ]
  }
)
```
