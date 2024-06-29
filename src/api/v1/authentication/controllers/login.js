const { findUserByEmail } = require ("../../../../lib/user");
var jwt = require('jsonwebtoken');
const { createLoginHistory} = require ("../../../../lib/authentication");
const { UserLoginSchema } = require("../zodSchema");
const bcrypt = require("bcryptjs");


const userLogin = async (req, res, next) => {
	try {
		const ipAddress =
			(req.headers['x-forwarded-for'] ) || req.ip || '';
		const userAgent = req.headers['user-agent'] || '';

		// Validate the request body
        const userObj={email:req.body.email,password:req.body.password}
		const parsedBody = UserLoginSchema.safeParse(userObj);
		if (!parsedBody.success) {
			return res.status(400).json({ errors: parsedBody.error.errors });
		}

		// check if the user exists
		const user = await  findUserByEmail(parsedBody?.data?.email) ;
        console.log(user)
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// compare password
		const isMatch = await bcrypt.compare(
			parsedBody.data.password,
			user.password
		);
		if (!isMatch) {
			await createLoginHistory({
				userId: user._id,
				userAgent,
				ipAddress,
				attempt: 'FAILED',
			});
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// check if the user is verified
		if (!user.verified) {
			await createLoginHistory({
				userId: user._id,
				userAgent,
				ipAddress,
				attempt: 'FAILED',
			});
			return res.status(400).json({ message: 'User not verified' });
		}

		// check if the account is active
		if (user.status !== 'ACTIVE') {
			await createLoginHistory({
				userId: user._id,
				userAgent,
				ipAddress,
				attempt: 'FAILED',
			});
			return res.status(400).json({
				message: `Your account is ${user.status.toLocaleLowerCase()}`,
			});
		}

		console.log("JWT_SECRET", process.env.JWT_SECRET)
		// generate access token
		const accessToken = jwt.sign(
			{ userId: user._id, email: user.email, name: user.name, role: user.role },
			process.env.JWT_SECRET ?? 'My_Secret_Key',
			{ expiresIn: '1d' }
		);

		await createLoginHistory({
			userId: user._id,
			userAgent,
			ipAddress,
			attempt: 'SUCCESS',
		});

		return res.status(200).json({
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};

module.exports= userLogin;
