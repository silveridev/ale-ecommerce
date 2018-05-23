const nodemailer = require("nodemailer");

module.exports = function(to, subject, text) {
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
			refeshToken: "1/IM-viLw4cb4Q1v84WJV8H__JZLgyfLnUcE7detwsMzE",
			accessToken:
				"ya29.GlvDBVWazUzYqwCw3xxDFtNiiBGEIGyaEgLopgcTFShhTMfGgj4WlLQaRSoRw0yi8hirMc1H7UjkKvihbRzaskrSAwbjBu-pPRLxrrCaD4gD_7Dv7ve997LndULE"
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

// const transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		type: "OAuth2",

// 		host: "smtp.gmail.com",
// 		clientId:
// 			"713709348701-t5ir2kbad2cpp4pdleifv1lhqr9b4f74.apps.googleusercontent.com",
// 		clientSecret: "mWSWOva9wRoPZADx8TLvdTMr"
// 		// refeshToken: "1/QfBXhpNY7U3gI7mGNAuhImsePd28C4ig_-DXfcrBKPo"
// 	}
// });

// const mailOptions = {
// 	from: "Ale <silveridev@gmail.com>",
// 	to: "udunig@gmail.com",
// 	subject: "haha",
// 	text: "test",
// 	auth: {
// 		user: "silveridev@gmail.com",
// 		refeshToken: "1/7RjZxPNr0hQ7JabL_OvfbYz3U2DXLF1cy-k9R2eXa0M",
// 		accessToken:
// 			"ya29.GlvDBfpJ0xzzfyGkrKV_bQqVTp5eO2W5v1-Hfj9GZkdfySgBkukjUixjP6i-A6PiK-Jp6Xejfxs_xsjk7Ew0uvr1HGJvUFwJMOOxCg9WbplNKrFfQoh0cJXgAamW"
// 	}
// };

// transporter.sendMail(mailOptions, (error, res) => {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log("Email sent");
// 	}
// });
