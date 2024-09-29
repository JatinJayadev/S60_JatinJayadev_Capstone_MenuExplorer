const axios = require('axios');

describe('Login Route testing', () => {
    test('should return a token for valid credentials', async () => {
        const response = await axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/login', {
            email: 'jayadevjatin@gmail.com',
            password: '12345'
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('token');
    });

    test('should return 401 for invalid credentials', async () => {
        try {
            const response = await axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/login', {
                email: 'jayadevjatin@gmail.com',
                password: '123456'
            });
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty('message', "Invalid Credentials");
        }
    });

    test('should return 404 for user not in database', async () => {
        try {
            await axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/login', {
                email: 'jayadevjjatin@gmail.com',
                password: '1234'
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toHaveProperty('message', "Invalid User");
        }
    });
});


describe('Register Route Testing', () => {
    test('should register a new user successfully', async () => {
        const response = await axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/register', {
            name: 'Jatin',
            email: 'Jayadev@gmail.com',
            password: '123',
            photoLink: 'http://example.com/photo.jpg'
        });

        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('name', 'Jatin');
        expect(response.data).toHaveProperty('email', 'Jayadev@gmail.com');
        expect(response.data).toHaveProperty('roles', 'user');
    });

    test('should not allow registration with an existing email', async () => {
        try {
            await axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/register', {
                name: 'Jatin',
                email: 'Jayadev@gmail.com',
                password: '123',
                photoLink: 'http://example.com/photo.jpg'
            });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toHaveProperty('message', 'User already registered with this email.');
        }
    });

    test('should return 500 for server error', async () => {
        try {
            await axios.post('https://s60-jatinjayadev-capstone-menuexplorer.onrender.com/register', {
                name: '',
                email: '',
                password: '',
                photoLink: ''
            });
        } catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toHaveProperty('message');
        }
    });
})