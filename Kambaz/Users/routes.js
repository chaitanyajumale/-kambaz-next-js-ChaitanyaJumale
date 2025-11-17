import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  
  const signin = (req, res) => {
    const { username, password } = req.body;
    console.log("Signin attempt for username:", username);
    
    const currentUser = dao.findUserByCredentials(username, password);
    
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          res.status(500).json({ message: "Session error" });
        } else {
          console.log("Session saved for user:", currentUser.username);
          console.log("Session after signin:", req.session);
          res.json(currentUser);
        }
      });
    } else {
      console.log("Invalid credentials for username:", username);
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
      }
    });
    
    res.json(currentUser);
  };
  
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
      req.session.save();
    }
    const updatedUser = dao.findUserById(userId);
    res.json(updatedUser);
  };
  
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}