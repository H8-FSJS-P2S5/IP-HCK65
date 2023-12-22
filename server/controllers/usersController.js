const { comparePassword } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");
const { sendVerificationEmail } = require("../helpers/nodemailer");
const errorHanlder = require("../midlewares/errorHanlder");
const { User } = require("../models");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
const crypto = require('crypto');
module.exports = class usersController {

    static async register(req, res, next) {
        try {
            const verifyToken = crypto.randomBytes(16).toString('hex');
            const newUser = await User.create({ ...req.body, verifyToken })
            sendVerificationEmail(req.body.email, verifyToken);
            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
        } catch (error) {
           next(error)
        }
    }


    static async verifyEmail(req, res, next){
        try {
            const { token } = req.query;
        const user = await User.findOne({ where: { verifyToken: token } });
        if (!user) throw ({ nama : 'InvalidToken'});

        user.isVerified = true;
        user.verifyToken = null;
        await user.save();
        res.status(200).json({message : 'success'})
        } catch (error) {
            next(error)
        }
    }


    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) throw ({name : 'EmailorPasswordRequired'})

            const user = await User.findOne({where: {email}})
            if(!user) throw ({name : 'InvalidAccount'})

            const isMatch = comparePassword(password, user.password)
            if(!isMatch) throw ({name : 'InvalidAccount'})

            const access_token = getToken({id: user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error);
        }
    }

    static async loginGoogle(req, res, next){
        try {
            const {google_token} = req.body
            const ticket = await client.verifyIdToken({
                idToken : google_token,
                audience : process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where : { email : payload.email},
                defaults : {
                    fullName : payload.name,
                    email : payload.email,
                    password : Math.random().toString(),
                    address : payload.given_name,
                    phoneNumber : payload.family_name
                }
            })

            const access_token = getToken({id : user.id})
            res.status(created ? 201 : 200).json({
                "message": 'Login Success',
                "access_token" : access_token
            })
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async updateProfile(req, res, next){
        try {

            const user = await User.findByPk(req.user.id)
            await user.update({...req.body})
            
            res.status(201).json({
                fullName : user.fullName,
                phoneNumber : user.phoneNumber,
                address : user.address,
                email : user.email
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getUser(req, res, next){
        try {
            const user = await User.findByPk(req.user.id)
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    }
}