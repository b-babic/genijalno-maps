import React, {PureComponent} from "react";
import styles from "./style.scss";

export default class About extends PureComponent {
    render() {
        return (
            <div className={styles.about}>
                <h1>Hi there, welcome to dummy remote workers overview.</h1>
                <h3>Quick brief: </h3>
                <ul>
                    <li>Admin can create account and log in into system;</li>
                    <li>Sign up and Sign in flows are using some validation on their fields;</li>
                    <li>When you open the app, it checks for the user token, and then redirects you to dashboard/log in;</li>
                    <li>After successfully creating new user, user is automatically logged in and redirected;</li>
                    <li>Sign out link simply signs user out of system;</li>
                    <li>About page leads you here (quick brief);</li>
                    <li>Dashboard page is showing list of remote team members; Main idea was to provide user data such as : status, skype, mail or tel number;</li>
                    <li>At any time you can check if some of team members is away or online and on marker click details page popup;</li>
                    <li>Simple popup window culd be easily added to marker hover and on click call them on skype or w/e.</li>
                </ul>
            </div>
        );
    }
}