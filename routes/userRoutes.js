const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
router.get('/users',userController.getUsers)
router.get('/users/:id',userController.getUserById)
router.post('/users',userController.createUser)
router.delete('/users/:id',userController.deleteUser)
router.put('/users/:id',userController.updateUser)
router.get('/userassets',userController.getUserAsset)
router.get('/completeUserDetails',userController.getCompleteDetails)
module.exports=router;