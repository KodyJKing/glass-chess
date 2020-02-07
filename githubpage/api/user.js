"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webServer = __importStar(require("../../server/webServer"));
const Key_1 = __importDefault(require("../../data/Key"));
const model_1 = __importDefault(require("../../model"));
const sendgrid_1 = __importDefault(require("../../server/sendgrid"));
const crypto = __importStar(require("../../utility/crypto"));
const http_1 = __importDefault(require("../../utility/http"));
const twilio_1 = __importStar(require("../../server/twilio"));
const LoginForm_1 = require("../../ui/html/components/Login/LoginForm");
const SignupForm_1 = require("../../ui/html/components/Login/SignupForm");
const phone_1 = require("../../utility/phone");
const User_1 = __importDefault(require("../../model/User"));
const Identity_1 = __importDefault(require("../../model/Identity"));
const IdentityProvider_1 = require("../../server/IdentityProvider");
const secret = __importStar(require("../../server/secret"));
const second = 1;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const database = webServer.instance.database;
function getAbsoluteUrl(req, url) {
    return `${req.protocol}://${req.get("host")}${url}`;
}
async function login(state) {
    if (!(state instanceof LoginForm_1.LoginFormModel)) {
        return { status: "error", error: "invalid state" };
    }
    let [user] = await database.get([Key_1.default.create(model_1.default.User, state.email)]);
    if (user == null) {
        return { status: "invalid user" };
    }
    if (!(user instanceof User_1.default)) {
        console.error("Entity is not a User!?", user);
        return { status: "error", error: "User is corrupted" };
    }
    if (crypto.hashVerify(state.password, user.passwordHash)) {
        let token = new Identity_1.default({
            name: user.name,
            email: user.email,
            issued: new Date().toISOString()
        });
        return { status: "success", accessToken: IdentityProvider_1.signToken(token, 7 * day) };
    }
    else {
        return { status: "invalid password" };
    }
}
exports.login = login;
/**
 * Returns true if a User with this email exists, false otherwise.
 */
async function exists(email) {
    let [user] = await database.get([Key_1.default.create(model_1.default.User, email)]);
    console.log(JSON.stringify({ email, user: user || null }));
    return user != null;
}
exports.exists = exists;
async function signup(user, req, res) {
    try {
        //  it's important that we check type here because if we don't
        //  then the import of SignupForm is removed by the compiler
        //  and we need it in order for the SignupFormModel to get registered
        //  with Model.serializer.register so we can deserialize it.
        console.log("headers", JSON.stringify(req.headers));
        if (!(user instanceof SignupForm_1.SignupFormModel)) {
            return { status: "submit error", error: "Expected SignupFormModel" };
        }
        if (await exists(user.email)) {
            return { status: "user exists" };
        }
        const rest = { ...user };
        rest.passwordHash = secret.encrypt(crypto.hash(user.password));
        delete rest.password;
        delete rest.passwordConfirm;
        const verifyEmailUrl = getAbsoluteUrl(req, `/api/user/${verifyEmail.name}`);
        const redirectUrl = req.headers.referer;
        //  TEMP: made duration longer for easier testing.
        const token = secret.jwtSign({ step: "email", redirectUrl, ...rest }, 2000 * minute);
        const link = verifyEmailUrl + http_1.default.queryFromObject({ token });
        console.log(`Sending Email Verification link\n${link}`);
        const [response] = await sendgrid_1.default.send({
            to: [user.email],
            from: "test@xpoint.com",
            subject: "XPoint Todo MVC Demo Signup",
            text: `Follow the link to verify your email: ${link}`
        });
        return { status: "mail sent" };
    }
    catch (e) {
        if (e.response) {
            console.error("Sendgrid Errors:", e.response.body.errors);
        }
        else {
            console.error("Signup Error", e);
        }
        return { status: "submit error", error: e.message };
    }
}
exports.signup = signup;
async function verifyEmail(req, res) {
    const message = secret.jwtVerify(req.query.token);
    if (message == null) {
        return res.status(410).send(`This email verification link is expired, please signup again.`);
    }
    const { email, mobile, step, ...rest } = message;
    if (step !== "email") {
        return res.send(`invalid step: ${email}`);
    }
    // res.send("verifyEmail: " + JSON.stringify({ email, step, ...rest }))
    const token = secret.jwtSign({ email, mobile, step: "mobile", ...rest }, 2000 * minute);
    let verifyMobileUrl = getAbsoluteUrl(req, `/api/user/${verifyMobile.name}`);
    let link = verifyMobileUrl + http_1.default.queryFromObject({ token });
    console.log(`Sending Mobile Verification link\n${link}`);
    try {
        let result = await twilio_1.default.messages.create({
            to: phone_1.formatPhoneES164(mobile),
            from: twilio_1.fromPhone,
            body: "To validate your mobile number and finish signup follow the link: " + link
        });
        // console.log("Result", result)
        res.send(`Email address verified. The final step is to verify your mobile number. Please check your mobile device for a text message and follow the link.`);
    }
    catch (e) {
        console.error("Error sending mobile verification:", e);
        res.send(`Error sending mobile verification.`);
    }
}
exports.verifyEmail = verifyEmail;
//  TODO:
//      [x] Create PasswordHash, encrypt and put in JWT.
//      [x] Remove Password and ConfirmPassword from JWT.
//      [x] Decrypt PasswordHash and store on new User record.
//      [x] Create new User record.
//      [x] Login -> validate user and password.
//      [x] Client auth token design.
//      [x] Server namespace design including private passwordHash.
//      [ ] we need to reply with patches back to client on data/put.
//      [ ] provide User authorization with requests, whitelist public apis.
//      [ ] implement Patch diff calculation and add tests.
async function verifyMobile(req, res) {
    const message = secret.jwtVerify(req.query.token);
    if (message == null) {
        return res.status(410).send(`This email verification link is expired, please signup again.`);
    }
    const { redirectUrl, email, exp, step, ...rest } = message;
    if (step !== "mobile") {
        return res.send(`invalid step: ${step}`);
    }
    // now decrypt the passwordHash
    console.log("rest", rest);
    rest.passwordHash = secret.decrypt(rest.passwordHash);
    const key = Key_1.default.create(model_1.default.User, email);
    try {
        const user = new User_1.default({ ...rest, key });
        database.put([user]);
        res.send("User account successfully created. You can login now: " + redirectUrl);
    }
    catch (e) {
        console.error("verifyMobile error:", e);
        res.status(500).send("Error creating user account");
    }
}
exports.verifyMobile = verifyMobile;
