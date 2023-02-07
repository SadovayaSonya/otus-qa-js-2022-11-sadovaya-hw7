import user from "../helpers/user.js";

describe('Удаление пользователя DELETE /Account/v1/User/{UUID}', () => {

    let userUuid = '', token = '';

    beforeAll(async () => {
        userUuid = await user.getUserId();
        token = await user.getAuthToken();
    });

    afterAll(async () => await user.deleteUser(userUuid, token));

    test('Удаление пользователя без токена', async () => {
        const response = await user.deleteUser(userUuid);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({code: '1200', message: 'User not authorized!'});
    });

    test('Успешное удаление пользователя с верным UUID и токеном', async () => {
        const response = await user.deleteUser(userUuid, token);
        expect(response.status).toEqual(204);
    });

    test('Удаление пользователя с неверным UUID', async () => {
        const response = await user.deleteUser('uuid', token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({code: '1207', message: 'User Id not correct!'});
    });

})
