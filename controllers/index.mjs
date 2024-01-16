import { RESPONSE_MESSAGES } from "../constants/enums.mjs";

const index = async (req, res) => {
	try {
		console.log(req.cookies);
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: RESPONSE_MESSAGES.SERVER_ERROR,
			error: error.message,
		});
	}
};

export { index };
