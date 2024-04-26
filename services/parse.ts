import Parse from "parse";

if (typeof window !== "undefined") {
    Parse.initialize("aSrmbjjMiw9l6Oo7YKQ3iYUwUAOCxb5zQTsUmVOk", "2njHFirw1b0NPqJ3ORF8PIQjYoonbMB4N12yxpCF");
    Parse.serverURL = "https://parseapi.back4app.com/";
}

export default Parse;
