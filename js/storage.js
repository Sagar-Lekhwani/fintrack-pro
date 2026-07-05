/* ==========================================================
   FinTrack Pro
   storage.js
   Handles Local Storage Operations
==========================================================*/

const STORAGE_KEYS = {
    TRANSACTIONS: "fintrack_transactions",
    PROFILE: "fintrack_profile",
    THEME: "fintrack_theme"
};

/* ==========================================================
   TRANSACTIONS
==========================================================*/

/**
 * Get all transactions
 */
function getTransactions() {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);

    if (!data) return [];

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading transactions:", error);
        return [];
    }
}

/**
 * Save transaction array
 */
function saveTransactions(transactions) {
    localStorage.setItem(
        STORAGE_KEYS.TRANSACTIONS,
        JSON.stringify(transactions)
    );
}

/**
 * Add new transaction
 */
function addTransaction(transaction) {

    const transactions = getTransactions();

    transactions.unshift(transaction);

    saveTransactions(transactions);
}

/**
 * Delete transaction
 */
function deleteTransaction(id) {

    const transactions = getTransactions().filter(
        transaction => transaction.id !== id
    );

    saveTransactions(transactions);
}

/* ==========================================================
   PROFILE
==========================================================*/

/**
 * Default profile
 */
const DEFAULT_PROFILE = {

    name: "Guest",

    currency: "USD"

};

/**
 * Get profile
 */
function getProfile() {

    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);

    if (!data) return DEFAULT_PROFILE;

    try {
        return JSON.parse(data);
    } catch (error) {
        return DEFAULT_PROFILE;
    }

}

/**
 * Save profile
 */
function saveProfile(profile) {

    localStorage.setItem(
        STORAGE_KEYS.PROFILE,
        JSON.stringify(profile)
    );

}

/* ==========================================================
   THEME
==========================================================*/

/**
 * Save Theme
 * light | dark
 */
function saveTheme(theme) {

    localStorage.setItem(
        STORAGE_KEYS.THEME,
        theme
    );

}

/**
 * Get Theme
 */
function getTheme() {

    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";

}

/* ==========================================================
   RESET
==========================================================*/

/**
 * Reset complete application
 */
function resetApplication() {

    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);

    localStorage.removeItem(STORAGE_KEYS.PROFILE);

    localStorage.removeItem(STORAGE_KEYS.THEME);

}

/* ==========================================================
   STATISTICS
==========================================================*/

/**
 * Calculate dashboard summary
 */
function calculateSummary() {

    const transactions = getTransactions();

    let income = 0;

    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += Number(transaction.amount);

        } else {

            expense += Number(transaction.amount);

        }

    });

    return {

        income,

        expense,

        balance: income - expense,

        count: transactions.length

    };

}

/* ==========================================================
   SORT
==========================================================*/

/**
 * Sort newest first
 */
function sortTransactions() {

    const transactions = getTransactions();

    transactions.sort((a, b) => {

        return new Date(b.date) - new Date(a.date);

    });

    saveTransactions(transactions);

}

/* ==========================================================
   SEARCH
==========================================================*/

/**
 * Search transaction
 */
function searchTransactions(keyword) {

    const transactions = getTransactions();

    const search = keyword.toLowerCase();

    return transactions.filter(transaction => {

        return (

            transaction.description
                .toLowerCase()
                .includes(search)

            ||

            transaction.category
                .toLowerCase()
                .includes(search)

        );

    });

}

/* ==========================================================
   FILTER
==========================================================*/

/**
 * Get filtered transactions
 */
function filterTransactions(type) {

    const transactions = getTransactions();

    if (type === "all") {

        return transactions;

    }

    return transactions.filter(

        transaction => transaction.type === type

    );

}

/* ==========================================================
   EXPORT
==========================================================*/

const Storage = {

    getTransactions,

    saveTransactions,

    addTransaction,

    deleteTransaction,

    getProfile,

    saveProfile,

    saveTheme,

    getTheme,

    calculateSummary,

    searchTransactions,

    filterTransactions,

    sortTransactions,

    resetApplication

};