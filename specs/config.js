import {randomName, randomPassword} from "./helpers/utils.js";

const username = randomName(7);
const password = randomPassword();

const config = {
    url: 'https://bookstore.demoqa.com', // базовый URL
    credentials: {
        userName: `${username}`,
        password: `${password}`
    }
}

export default config;
