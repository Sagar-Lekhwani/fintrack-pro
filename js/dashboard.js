/* ==========================================================
   FinTrack Pro
   dashboard.js
   Handles Dashboard Summary
==========================================================*/

const Dashboard = {

    // ==============================
    // Initialize Dashboard
    // ==============================

    init() {

    this.balanceEl = document.getElementById("balance");
    this.incomeEl = document.getElementById("income");
    this.expenseEl = document.getElementById("expense");
    this.countEl = document.getElementById("count");

    // Load logged in user
    Utils.loadProfile();

    this.update();

},

    // ==============================
    // Update Dashboard
    // ==============================

    update() {

        const summary = Storage.calculateSummary();

        this.updateBalance(summary.balance);

        this.updateIncome(summary.income);

        this.updateExpense(summary.expense);

        this.updateCount(summary.count);

    },

    // ==============================
    // Balance
    // ==============================

    updateBalance(balance) {

        this.balanceEl.textContent = Currency.format(balance);

    },

    // ==============================
    // Income
    // ==============================

    updateIncome(income) {

        this.incomeEl.textContent = Currency.format(income);

    },

    // ==============================
    // Expense
    // ==============================

    updateExpense(expense) {

        this.expenseEl.textContent = Currency.format(expense);

    },

    // ==============================
    // Transactions Count
    // ==============================

    updateCount(count) {

        this.countEl.textContent = count;

    },

    // ==============================
    // Refresh Dashboard
    // ==============================

    refresh() {

        this.update();

        if (typeof ChartManager !== "undefined") {

            ChartManager.update();

        }

    }

};