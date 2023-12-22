const request = require('supertest');
const { sequelize, User } = require('../models');
const { queryInterface } = sequelize
const app = require('../app');
const { getToken } = require('../helpers/jwt');
const { hasPassword } = require('../helpers/bcrypt');



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

        await queryInterface.bulkInsert('ReadingLists', [{
            title : "RICH DAD POOR DAD",
            UserId : 1,
            BookId : "AACAvsyTbhbc",
            imageUrl : "http://images.com/thumbnail.jpg",
            author : "Robert Kiyosaki",
            publisher : "Gramedia",
            publisherDate : "12-12-2023",
            pages : "43",
            linkReading : "http://linkreading.com",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

        const user = await User.findByPk(1)
        access_token = getToken({ id: user.id })
    } catch (error) {
        console.log(error);
    }
})


describe('POST /reading-list', () => {

    const bookData = {
        id: 'AACAvsyTbhbc',
        volumeInfo: {
            title: 'RICH DAD POOR DAD',
            authors: ['Robert Kiyosaki'],
            publisher: 'Gramedia',
            publishedDate: '12-12-2023',
            pageCount: 43,
            imageLinks: {
                thumbnail: 'http://images.com/thumbnail.jpg'
            }
        },
        accessInfo: {
            webReaderLink: 'http://linkreading.com'
        }
    };

    test('201 should add book to database reading list', async () => {
        const { status, body } = await request(app)
            .post('/reading-list')
            .set("Authorization", `Bearer ${access_token}`)
            .send(bookData);
        expect(status).toBe(201);
        expect(body).toHaveProperty('message');
    });

});


describe('GET /reading-list', () => {

    test('200 should fetch book', async () => {
        const { status, body } = await request(app)
            .get('/reading-list')
            .set("Authorization", `Bearer ${access_token}`)
        expect(status).toBe(200);
    });

    test('401 should fetch book', async () => {
        const { status, body } = await request(app)
            .get('/reading-list')
        expect(status).toBe(401);
    });

});



describe('DELETE /reading-list/:id', () => {

    test('200 should delete a book from the reading list', async () => {
        const id = '1';

        const { status, body } = await request(app)
            .delete(`/reading-list/${id}`) 
            .set('Authorization', `Bearer ${access_token}`);
        
        expect(status).toBe(200);
        expect(body).toHaveProperty('message');
    });

    test('404 should error due books not found', async () => {
        const id = '99';

        const { status, body } = await request(app)
            .delete(`/reading-list/${id}`) 
            .set('Authorization', `Bearer ${access_token}`);
        
        expect(status).toBe(404);
        expect(body).toHaveProperty('message');
    });

});






afterAll(async () => {
    try {
        await queryInterface.bulkDelete('Users', null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        })
        await queryInterface.bulkDelete('ReadingLists', null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        })

    } catch (error) {
        console.error(error);
    }

})