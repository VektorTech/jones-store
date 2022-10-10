import { createContext, ReactElement, useContext } from "react";
import useUser from "@Lib/hooks/useUser";

const userState: {
	userSessionId?: string;
	user?: ({
		id: string;
		avatarURL: string;
		username: string;
		email: string;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		deactivated: boolean;
	});
	isLoading?: boolean;
	isError?: boolean;
} = {
	userSessionId: undefined,
	user: undefined,
	isLoading: undefined,
	isError: undefined
};

const UserContext = createContext(userState);

export const useUserState = () => useContext(UserContext);

export const UserProvider = ({ children, userId }: { children: ReactElement, userId?: string }) => {
	const { user, isLoading, isError } = useUser(userId);

	return (
		<UserContext.Provider value={{ userSessionId: userId, user, isLoading, isError }}>
			{ children }
		</UserContext.Provider>
	);
};