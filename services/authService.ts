import Parse from "./parse";

export const createUser = (newUser: any) => {
    const user = new Parse.User();

    user.set("username", newUser.email);
    user.set("firstName", newUser.firstName);
    user.set("lastName", newUser.lastName);
    user.set("password", newUser.password);
    user.set("email", newUser.email);

    console.log("User: ", user)

    return user
        .signUp()
        .then((newUserSaved) => {
            return newUserSaved;
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
};

export const loginUser = (currUser: any) => {
    const user = new Parse.User();

    user.set("password", currUser.password);
    user.set("username", currUser.email);

    console.log("User: ", user);
    console.log();

    return user
        // @ts-ignore
        .logIn(user.email, user.password)
        .then((currUserSaved) => {
            return currUserSaved;
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
};

export const checkUser = () => {
    return Parse.User.current()?.authenticated;
};

export const logOutUser = () => {
    Parse.User.logOut();
}

