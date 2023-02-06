export function randomName(length) {
    let name = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        name += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return name;
};

export function randomPassword() {
    let password = '';
    const digits = '0123456789';
    const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const specialCharacters = '!@#$%^&*()';

    password = addSymbol(digits) + addSymbol(capitalLetters) + addSymbol(lowercaseLetters) + addSymbol(specialCharacters);
    return password;
};

function addSymbol(characters) {
    let i = 0;
    let result = '';
    while (i < 3) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        i++;
    }
    return result;
};