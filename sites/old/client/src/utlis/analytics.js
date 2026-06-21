import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-4JP9RQHKWL";

export const initGA = () => {
    ReactGA.initialize(GA_TRACKING_ID);
    ReactGA.send("pageview");
};

export const logEvent = (category, action, label) => {
    ReactGA.event({ category, action, label });
};

export const setGAConsent = () => {
    localStorage.setItem("ga_consent", "true");
    window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
    });
    initGA();
};

export const pageview = (url) => {
    ReactGA.send("pageview", url);
};
