const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const { getToken } = require('../helpers/jwt')
const { hasPassword } = require('../helpers/bcrypt');
const { queryInterface } = sequelize


let access_token = null;
beforeAll(async () => {
    try {
        await queryInterface.bulkInsert('Users', [{
            fullName: 'wahyu',
            phoneNumber: '123456789100',
            address: 'Jln Bangun Karya',
            email: 'wahyu@gmail.com',
            password: hasPassword('12345'),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
        const user = await User.findByPk(1)
        access_token = getToken({ id: user.id })

    } catch (error) {
        console.log(error);
    }
})

describe('POST /users/login', () => {

    test('200 user success login', async () => {
        const user = {
            email: "wahyu@gmail.com",
            password: "12345"
        }
        const { body, status } = await request(app)
            .post('/users/login')
            .send(user);
        const access_token = getToken({id: user.id})
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token')
    });

    test('400 error due email not sent', async () => {
        const user = {
            email: "",
            password: "12345"
        }
        const { body, status } = await request(app)
            .post('/users/login')
            .send(user);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Email and Password is Required')
    });

    test('400 error due password not sent', async () => {
        const user = {
            email: "wahyu@gmail.com",
            password: ""
        }
        const { body, status } = await request(app)
            .post('/users/login')
            .send(user);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Email and Password is Required')
    });

    test('401 error due invalid email', async () => {
        const user = {
            email: "wahyu123@gmail.com",
            password: "12345"
        }
        const { body } = await request(app)
            .post('/users/login')
            .send(user);
        expect(401);
        expect(body).toHaveProperty('message', 'Invalid Email or Password')
    });

    test('401 error due invalid password', async () => {
        const user = {
            email: "wahyu@gmail.com",
            password: "1234567"
        }
        const token = getToken({ id: user.id, role: user.role })
        const { body } = await request(app)
            .post('/users/login')
            .send(user);
        expect(401);
        expect(body).toHaveProperty('message', 'Invalid Email or Password')
    });
    
})


describe('POST /users/register', () => {

    test('201 user should success register', async () => {
      const user = {
        fullName: 'testing',
        phoneNumber: '123456789100',
        address: 'Jln Bangun Karya',
        email: 'testing@gmail.com',
        password:'12345'
      }
      const { body, status } = await request(app)
        .post('/users/register')
        .send(user);
      expect(status).toBe(201);
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('fullName', user.fullName)
      expect(body).toHaveProperty('email', user.email)
    });
  
  
    test('400 error due data user not sent', async () => {
      const user = {
        fullName: '',
        phoneNumber: '',
        address: '',
        email: '',
        password:''
      }
      const { body, status } = await request(app)
        .post('/users/register')
        .send(user);
      expect(status).toBe(400);
      expect(body).toHaveProperty('message')
    });
  
  })

  describe('PUT /users', () => {

    test('201 user should success update profile', async () => {
      const user = {
        fullName: 'wahyu ragil',
        phoneNumber: '123456789100',
        address: 'Jln Bangun Karya',
        email: 'wahyu@gmail.com',
      }
      const { body, status } = await request(app)
        .put('/users')
        .set('Authorization', `Bearer ${access_token}`)
        .send(user);
      expect(status).toBe(201);
      expect(body).toHaveProperty('fullName', user.fullName)
      expect(body).toHaveProperty('phoneNumber', user.phoneNumber)
      expect(body).toHaveProperty('address', user.address)
      expect(body).toHaveProperty('email', user.email)
    });
  
  
    test('400 error due data user not sent', async () => {
      const user = {
        fullName: '',
        phoneNumber: '',
        address: '',
        email: '',
      }
      const { body, status } = await request(app)
        .put('/users')
        .set('Authorization', `Bearer ${access_token}`)
        .send(user);
      expect(status).toBe(400);
      expect(body).toHaveProperty('message')
    });
  
  })
  
afterAll(async () => {
    try {
        await queryInterface.bulkDelete('Users', null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        })
    } catch (error) {
        console.error(error);
    }

})