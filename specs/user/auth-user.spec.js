import user from "../helpers/user.js";
import config from "../config.js";

describe('Проверка авторизации пользователя POST /Account/v1/Authorized', () => {

    let token = '', userUuid = '';

    beforeAll(async () => userUuid = await user.registrationUser());

    afterAll(async () => {
        token = await user.getAuthToken();
        await user.deleteUser(userUuid, token);
    });

    test('Проверка авторизации до получения токена', async () => {
        const response = await user.authorizationUser();
        expect(response.status).toEqual(200);
        expect(response.body).toBeFalsy();
    });

    test('Проверка авторизации с правильным логином и паролем после получения токена', async () => {
        token = await user.getAuthToken();
        const response = await user.authorizationUser();
        expect(response.status).toEqual(200);
        expect(response.body).toBeTruthy();
    });

    test('Проверка авторизации с неверным логином', async () => {
        const response = await user.authorizationUser({
            userName: 'WrongName',
            password: `${config.credentials.password}`
        });
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({code: '1207', message: 'User not found!'});
    });

    test('Проверка авторизации с неверным паролем', async () => {
        const response = await user.authorizationUser({
            userName: `${config.credentials.userName}`,
            password: 'WrongPassword'
        });
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({code: '1207', message: 'User not found!'});
    });

    test('Проверка авторизации без логина', async () => {
        const response = await user.authorizationUser({
            userName: '',
            password: `${config.credentials.password}`
        });
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({code: '1200', message: 'UserName and Password required.'});
    });

    test('Проверка авторизации без пароля', async () => {
        const response = await user.authorizationUser({
            userName: `${config.credentials.userName}`,
            password: ''
        });
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({code: '1200', message: 'UserName and Password required.'});
    });

})
