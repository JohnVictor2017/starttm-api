'use strict'

const md5 = require('md5');

const SignupRequest = use('App/Models/Auth/SignupRequest');
const User = use('App/Models/User');
const Mail = use('Mail');

const NotFoundEx = use('App/Exceptions/NotFoundException');


class SignupController {

    async register({ request, response }) {

        let { username, email, password } = request.all();
        let token = md5(email + password + username);

        let signup = await SignupRequest.create({ ...request.all(), token });

        await Mail.send('emails.signup', signup, (message) => {
            message
                .to(email)
                .from('starttm@account.com')
                .subject('Confirm Email Address')
        });

        response.status(202).send("Confirmation email has been sent.");
    }

    async confirm({ params, response }) {

        let signup = await SignupRequest.findOne({ token: params.token });

        if (!signup)
            throw new NotFoundEx();

        await SignupRequest.deleteOne({ token: params.token });

        let { email, username, password } = signup;

        await User.create({email, username, password});

        response.status(201).send("User has been registred.")
    }
}

module.exports = SignupController