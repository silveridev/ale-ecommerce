const nodemailer = require("nodemailer");

module.exports = (to, subject, text) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",

			host: "smtp.gmail.com",
			clientId:
				"713709348701-t5ir2kbad2cpp4pdleifv1lhqr9b4f74.apps.googleusercontent.com",
			clientSecret: "mWSWOva9wRoPZADx8TLvdTMr"
			// refeshToken: "1/QfBXhpNY7U3gI7mGNAuhImsePd28C4ig_-DXfcrBKPo"
		}
	});

	const mailOptions = {
		from: "Ale <silveridev@gmail.com>",
		to,
		subject,
		text,
		auth: {
			user: "silveridev@gmail.com",
			refeshToken: "1/QfBXhpNY7U3gI7mGNAuhImsePd28C4ig_-DXfcrBKPo",
			accessToken:
				"ya29.GluzBQNS3lu6fcfsTVj-5S3KilYGFxfa1OSbgb58XusT9rYVBud9FRM0IFo3ksqF9PSUZ6k4ZZTApW_vzYF9AWNLNOypaw9imR9mnCkqj7qK9WHHhWZF1vypvvO1"
		}
	};

	transporter.sendMail(mailOptions, (error, res) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent");
		}
	});
};
