import { RESPONSE_MESSAGES } from "../constants/enums.mjs";

export const login = async (req, res) => {
	try {
		return res.status(200).json({ message: RESPONSE_MESSAGES.SUCCESS });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
