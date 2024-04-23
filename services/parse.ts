import Parse from "parse";

if (typeof window !== "undefined") {
    Parse.initialize(process.env.NEXT_PUBLIC_APP_ID, process.env.NEXT_PUBLIC_JS_KEY);
    Parse.serverURL = "https://parseapi.back4app.com/";
}

export default Parse;
