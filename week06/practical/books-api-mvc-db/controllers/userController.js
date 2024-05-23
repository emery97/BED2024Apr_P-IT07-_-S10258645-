const User = require("../models/user");
const sql = require("mssql");

const createUser = async(req,res) => {
    const newUser = req.body;
    try{
        const createdUser = await User.createUser(newUser);
        res.status(201).json(createdUser);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error creating user");
    }
};
const getAllUsers = async(req,res) =>{
    try{
        const users = await User.getAllUsers();
        console.log(users);
        res.json(users);
    
    }
    catch(error){
        console.error(error);
        res.satus(500).send("Error retreiving users");
    }
};
const getUserById = async(req,res) =>{
    const userId = parseInt(req.params.id);
    try{
        const user = await User.getUserById(userId);
        if (!user){
            return res.status(400).send("User not found!");
        }
        res.json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error retrieving user");
    }
};
const updatedUser = async(req,res) =>{
    const userId = parseInt(req.params.id);
    const newUserData = req.body;

    try{
        const updatedUser = await User.updatedUser(userId, newUserData);
        if (!updatedUser){
            return res.status(404).send("User not found");
        }
        res.json(updatedUser);
    }catch(error){
        console.error(error);
        res.status(500).send("Error updating user");
    }
};
const deletedUser = async (req,res) =>{
    const userId = parseInt(req.params.id);
    try{
        const success = await User.deleteUser(userId);
        if(!success){
            return res.status(404).send("User not found");
        }
        res.status(204).send();
    }catch(error){
        console.error(error);
        res.status(500).send("Error deleting user");
    }
}
async function searchUsers(req, res) {
    const searchTerm = req.query.searchTerm; // Extract search term from query params
  
    try {    
      const users = await User.searchUsers(searchTerm);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching users" });
    }
}
async function getUsersWithBooks(req, res) {
    try {
      const users = await User.getUsersWithBooks();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users with books" });
    }
  }
module.exports = {
    getAllUsers,
    updatedUser,
    deletedUser,
    getUserById,
    createUser,
    getUsersWithBooks,
    searchUsers
};