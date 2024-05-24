const User = require("../models/user");  //import methods and also the User class I created in user.js

class UserController {
    static async createUser(req, res) {
      
      const newUser = req.body;

      // Validate that the username is provided
      if (!newUser.username) {
        return res.status(400).json({ error: "Username is required." });
      }
            
      try {
        const createdUser = await User.createUser(newUser);
        res.status(201).json(createdUser);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
      }
    }

    static async getAllUsers(req,res){
        try{
            const users = await User.getAllUsers();
            res.json(users);
        }
        catch (error){
            console.error(error);
            res.status(500).send("Error retriving users");
        }
    }

    static async getUserById(req, res){
        const userId = parseInt(req.params.id);
        try{
            const user = await User.getUserById(userId);
            if (!user){
                return res.status(404).send("User not found");
            }
            res.json(user);
        } catch (error){
            console.error(error);
            res.status(500).send("Error retrieving user");
        }
    }

    static updateUser = async (req, res) => {
      const userId = parseInt(req.params.id);
      const newUserData = req.body;
  
      try {
          const updatedUser = await User.updateUser(userId, newUserData);
          if (!updatedUser) {
              return res.status(404).send("User not found");
          }
          res.json(updatedUser)
      } catch (error) {
          console.error(error);
          res.status(500).send("Error updating user");
      }
  };
    static async deleteUser (req, res) {
      const userId = parseInt(req.params.id);
      try {
          const success = await User.deleteUser(userId);
          if (!success) {
              return res.status(404).send("User not found");
          }
          res.status(204).send();
      } catch(error) {
          console.error(error);
          res.status(500).send("Error deleting user");
      }
  };

    //NEW FUNCTION FOR SEARCH ...... !!
    static async searchUsers(req, res){
        const searchTerm = req.query.searchTerm; // Extract search term from query params

        try {    
          const users = await User.searchUsers(searchTerm);
          res.json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error searching users" });
        }
    } 
    
    
    //NEW FUNCTION AGAIN....!!
    static async getUsersWithBooks(req, res){
        try {
            const users = await User.getUsersWithBooks();
            res.json(users);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching users with books" });
          }
    }

  }

  

/* --------- CAN CHOOSE TO IMPORT LIKE THAT BC ALL METHODS IN CONTROLLER ARE UNDER 'UserController{'-------
  module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
  };
-------------------------------------------------------------------------------------------------------------- */
  
module.exports = UserController;
