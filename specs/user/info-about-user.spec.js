import user from "../helpers/user.js";
import config from "../config.js";

describe('Получение информации о пользователе GET /Account/v1/User/{UUID}', () => {

    let userUuid = '', token = '';

    beforeAll(async () => {
        userUuid = await user.getUserId();
        token = await user.getAuthToken();
    });

    afterAll(async () => await user.deleteUser(userUuid, token));

    test('Получение информации без токена', async () => {
        const response = await user.infoUser(userUuid);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({code: '1200', message: 'User not authorized!'});
    });

    test('Успешное получение информации с верным UUID', async () => {
        const response = await user.infoUser(userUuid, token);
        expect(response.status).toEqual(200);
        expect(response.body.userId).toEqual(userUuid);
        expect(response.body.username).toEqual(config.credentials.userName);
    });

    test('Получение информации с неверным UUID', async () => {
        const response = await user.infoUser('uuid', token);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({code: '1207', message: 'User not found!'});
    });

})
