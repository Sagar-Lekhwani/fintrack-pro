/* ==========================================================
   FinTrack Pro
   currency.js
   Handles Currency Formatting
==========================================================*/

const Currency = {

    currencies: {

        USD: {
            code: "USD",
            locale: "en-US",
            symbol: "$"
        },

        INR: {
            code: "INR",
            locale: "en-IN",
            symbol: "₹"
        },

        EUR: {
            code: "EUR",
            locale: "de-DE",
            symbol: "€"
        },

        GBP: {
            code: "GBP",
            locale: "en-GB",
            symbol: "£"
        },

        JPY: {
            code: "JPY",
            locale: "ja-JP",
            symbol: "¥"
        }

    },

    /**
     * Current Currency
     */
    getCurrentCurrency() {

        const profile = Storage.getProfile();

        return profile.currency || "USD";

    },

    /**
     * Currency Info
     */
    getCurrencyInfo() {

        return this.currencies[this.getCurrentCurrency()];

    },

    /**
     * Format Number
     */
    format(amount) {

        const currency = this.getCurrencyInfo();

        return new Intl.NumberFormat(

            currency.locale,

            {

                style: "currency",

                currency: currency.code,

                minimumFractionDigits: 2

            }

        ).format(amount);

    },

    /**
     * Currency Symbol
     */
    getSymbol() {

        return this.getCurrencyInfo().symbol;

    },

    /**
     * Change Currency
     */
    setCurrency(currencyCode) {

        if (!this.currencies[currencyCode]) {

            return;

        }

        const profile = Storage.getProfile();

        profile.currency = currencyCode;

        Storage.saveProfile(profile);

    },

    /**
     * Currency List
     */
    getCurrencyList() {

        return Object.keys(this.currencies);

    },

    /**
     * Check Valid Currency
     */
    isValid(currency) {

        return this.currencies.hasOwnProperty(currency);

    }

};