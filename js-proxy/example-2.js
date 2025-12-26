const form = document.forms["login-form"];
const formElements = form.elements;

const formState = new Proxy({
    login: '',
    password: '',
}, {
    set(target, key, newValue) {
        target[key] = newValue;
        formElements[key].value = newValue;
    },
});

Array.from(formElements).forEach(element => {
    element.addEventListener('change', () => {
        const { name, value } = element;
        formState[name] = value;
    })
});

const handleSubmit = (e) => {
    e.preventDefault();
    const { login, password } = formState;
    console.log({ login, password });
    formState.login = '';
    formState.password = '';
};

form.addEventListener('submit', handleSubmit);

// Fill test data
const testButton = document.getElementsByName('test')[0];

if (testButton) {
    testButton.addEventListener('click', () => {
        formState.login = 'test';
        formState.password = '1111111';
    });
}