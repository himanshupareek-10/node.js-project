const express = require('express');
const router = express.Router();

const LogInUsecase = require('../usecase/logInUsecase');
const LogOutUsecase = require('../usecase/logOutUsecase');
const AddUserUsecase = require('../usecase/addUserUsecase');
const GetUserUsecase = require('../usecase/getUserUsecase');
const UpdateUserUsecase = require('../usecase/updateUserUsecase');
const DeleteUserUsecase = require('../usecase/deleteUserUsecase');

router.post('/login', async(request, response, next) => {
    const usecase = LogInUsecase.create(request, response);
    await usecase.executeAndHandleErrors();
})

router.post('/logout', async(request, response, next) => {
    const usecase = LogOutUsecase.create(request, response);
    await usecase.executeAndHandleErrors();
})

router.post('/signup', async(request, response, next) => {
    const usecase = AddUserUsecase.create(request, response);
    await usecase.executeAndHandleErrors();
})

router.get('/', async(request, response, next) => {
    const usecase = GetUserUsecase.create(request, response);
    await usecase.executeAndHandleErrors();
})

router.put('/update', async(request, response, next) => {
    const usecase = UpdateUserUsecase.create(request, response);
    await usecase.executeAndHandleErrors();
})

router.delete('/delete', async(request, response, next) => {
    const usecase = DeleteUserUsecase.create(request, response);
    await usecase.executeAndHandleErrors();
})

module.exports = router;