/* ==========================================================
   FinTrack Pro
   transactions.js
   Part 4A
   Transaction Management
==========================================================*/

let editingTransactionId = null;

const Transactions = {

    // ============================
    // Variables
    // ============================

    transactions: [],

    form: null,

    modal: null,

    tableBody: null,

    openBtn: null,

    closeBtn: null,

    // ============================
    // Initialize
    // ============================

    init() {

        this.form = document.getElementById("transactionForm");

        this.modal = document.getElementById("modal");

        this.tableBody = document.getElementById("transactionTable");

        this.openBtn = document.getElementById("openModal");

        this.closeBtn = document.getElementById("closeModal");

        this.transactions = Storage.getTransactions();

        this.bindEvents();

    },

    // ============================
    // Events
    // ============================

    bindEvents() {

        this.openBtn.addEventListener("click", () => {

            this.openModal();

        });

        this.closeBtn.addEventListener("click", () => {

            this.closeModal();

        });

        document.getElementById("closeModalBtn")

            ?.addEventListener("click", () => {

                this.closeModal();

            });

        window.addEventListener("click", (e) => {

            if (e.target === this.modal) {

                this.closeModal();

            }

        });

        this.form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.saveTransaction();

        });

    },

    // ============================
    // Open Modal
    // ============================

    openModal() {

        editingTransactionId = null;

        this.form.reset();

        document.querySelector(".modal-header h2").textContent =

            "Add Transaction";

        const saveBtn = document.getElementById("saveTransactionBtn");

        saveBtn.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    Add Transaction
`;

        this.modal.classList.add("active");

    },

    // ============================
    // Close Modal
    // ============================

    closeModal() {

        editingTransactionId = null;

        this.form.reset();

        document.querySelector(".modal-header h2").textContent =

            "Add Transaction";

        const saveBtn = document.getElementById("saveTransactionBtn");

        saveBtn.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    Add Transaction
`;

        this.modal.classList.remove("active");

    },

    // ============================
    // Form Data
    // ============================

    getFormData() {

        return {

            date: document.getElementById("date").value,

            description: document.getElementById("description")

                .value

                .trim(),

            category: document.getElementById("category").value,

            type: document.getElementById("type").value,

            amount: Number(

                document.getElementById("amount").value

            )

        };

    },

    // ============================
    // Validation
    // ============================

    validate(transaction) {

        if (!transaction.date) {

            Utils.showToast("Please select a date.", "error");

            return false;

        }

        if (transaction.description === "") {

            Utils.showToast("Description is required.", "error");

            return false;

        }

        if (transaction.amount <= 0 || isNaN(transaction.amount)) {

            Utils.showToast(

                "Amount should be greater than zero.",

                "error"

            );

            return false;

        }

        return true;

    },

    // ============================
    // Add / Edit Transaction
    // ============================

    saveTransaction() {

        const transaction = this.getFormData();

        if (!this.validate(transaction)) {

            return;

        }

        if (editingTransactionId === null) {

            transaction.id = Date.now();

            Storage.addTransaction(transaction);

            Utils.showToast(

                "Transaction added successfully."

            );

        }

        else {

            const transactions =

                Storage.getTransactions();

            const index = transactions.findIndex(

                t => t.id == editingTransactionId

            );

            if (index !== -1) {

                transactions[index] = {

                    ...transaction,

                    id: editingTransactionId

                };

                Storage.saveTransactions(transactions);

            }

            Utils.showToast(

                "Transaction updated successfully."

            );

            editingTransactionId = null;

        }

        this.transactions =

            Storage.getTransactions();

        Dashboard.refresh();

        if (typeof ChartManager !== "undefined") {

            ChartManager.update();

        }

        this.render();

        this.closeModal();

    },


    // ============================
    // Render Transactions
    // ============================

    render(transactions = this.transactions) {

        this.tableBody.innerHTML = "";

        if (transactions.length === 0) {

            this.tableBody.innerHTML = `

        <tr>

            <td colspan="6">

                <div class="empty-state">

                    <i class="fa-solid fa-wallet"></i>

                    <h3>No Transactions Found</h3>

                    <p>Add your first transaction to get started.</p>

                </div>

            </td>

        </tr>

        `;

            return;

        }

        transactions.forEach(transaction => {

            const row = document.createElement("tr");

            row.innerHTML = `

        <td>${this.formatDate(transaction.date)}</td>

        <td>${transaction.description}</td>

        <td>${transaction.category}</td>

        <td>

            <span class="badge ${transaction.type}">

                ${this.capitalize(transaction.type)}

            </span>

        </td>

        <td class="${transaction.type}">

            ${Currency.format(transaction.amount)}

        </td>

        <td>

            <button
                class="edit-btn"
                onclick="Transactions.editTransaction(${transaction.id})">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="delete-btn"
                onclick="Transactions.deleteTransaction(${transaction.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

        `;

            this.tableBody.appendChild(row);

        });

    },

    // ============================
    // Edit Transaction
    // ============================

    editTransaction(id) {

        const transaction = this.transactions.find(

            t => t.id == id

        );

        if (!transaction) return;

        editingTransactionId = id;

        document.getElementById("date").value = transaction.date;

        document.getElementById("description").value = transaction.description;

        document.getElementById("category").value = transaction.category;

        document.getElementById("type").value = transaction.type;

        document.getElementById("amount").value = transaction.amount;

        document.querySelector(".modal-header h2").textContent =

            "Edit Transaction";

        const saveBtn = document.getElementById("saveTransactionBtn");

        saveBtn.innerHTML = `
    <i class="fa-solid fa-floppy-disk"></i>
    Save Changes
`;

        this.modal.classList.add("active");

    },

    // ============================
    // Delete Transaction
    // ============================

    deleteTransaction(id) {

        if (!confirm("Delete this transaction?")) {

            return;

        }

        Storage.deleteTransaction(id);

        this.transactions = Storage.getTransactions();

        Dashboard.refresh();

        this.render();

        if (typeof ChartManager !== "undefined") {

            ChartManager.update();

        }

        Utils.showToast("Transaction deleted successfully");

    },

    // ============================
    // Refresh
    // ============================

    refresh() {

        this.transactions = Storage.getTransactions();

        this.render();

    },

    // ============================
    // Helpers
    // ============================

    capitalize(text) {

        return text.charAt(0).toUpperCase()

            + text.slice(1);

    },

    formatDate(date) {

        return new Date(date).toLocaleDateString(

            "en-IN",

            {

                day: "2-digit",

                month: "short",

                year: "numeric"

            }

        );

    },
    // ============================
    // Search Transactions
    // ============================

    search(keyword) {

        keyword = keyword.toLowerCase().trim();

        return this.transactions.filter(transaction => {

            return (

                transaction.description
                    .toLowerCase()
                    .includes(keyword)

                ||

                transaction.category
                    .toLowerCase()
                    .includes(keyword)

            );

        });

    },

    // ============================
    // Filter Transactions
    // ============================

    filter(type) {

        if (type === "all") {

            return this.transactions;

        }

        return this.transactions.filter(

            transaction => transaction.type === type

        );

    },

    // ============================
    // Apply Search + Filter
    // ============================

    applyFilters() {

        const search = document

            .getElementById("search")

            .value

            .toLowerCase()

            .trim();

        const filter = document

            .getElementById("filter")

            .value;

        let data = [...this.transactions];

        if (filter !== "all") {

            data = data.filter(

                transaction => transaction.type === filter

            );

        }

        if (search !== "") {

            data = data.filter(transaction =>

                transaction.description

                    .toLowerCase()

                    .includes(search)

                ||

                transaction.category

                    .toLowerCase()

                    .includes(search)

            );

        }

        this.render(data);

    },

    // ============================
    // Search Events
    // ============================

    registerSearchFilterEvents() {

        const search = document.getElementById("search");

        const filter = document.getElementById("filter");

        if (search) {

            search.addEventListener(

                "input",

                () => this.applyFilters()

            );

        }

        if (filter) {

            filter.addEventListener(

                "change",

                () => this.applyFilters()

            );

        }

    },

    // ============================
    // Load Transactions
    // ============================

    load() {

        this.transactions =

            Storage.getTransactions();

        this.render();

    },

    // ============================
    // Start
    // ============================

    start() {

        this.init();

        this.load();

        this.registerSearchFilterEvents();

    }

};



