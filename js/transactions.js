/* ==========================================================
   FinTrack Pro
   transactions.js
   Part 4A
   Transaction Management
==========================================================*/

let editingTransactionId = null;

const Transactions = {

    // =====================================
    // Variables
    // =====================================

    transactions: [],

    form: null,

    modal: null,

    tableBody: null,

    openBtn: null,

    closeBtn: null,

    // =====================================
    // Initialize
    // =====================================

    init() {

        this.form = document.getElementById("transactionForm");

        this.modal = document.getElementById("modal");

        this.tableBody = document.getElementById("transactionTable");

        this.openBtn = document.getElementById("openModal");

        this.closeBtn = document.getElementById("closeModal");

        this.transactions = Storage.getTransactions();

        this.bindEvents();

    },

    // =====================================
    // Event Listeners
    // =====================================

    bindEvents() {

        this.openBtn.addEventListener(

            "click",

            () => this.openModal()

        );

        this.closeBtn.addEventListener(

            "click",

            () => this.closeModal()

        );

        window.addEventListener(

            "click",

            (event) => {

                if (event.target === this.modal) {

                    this.closeModal();

                }

            }

        );

        this.form.addEventListener(

    "submit",

    (event) => {

        event.preventDefault();

        this.saveTransaction();

    }

);

    },

    // =====================================
    // Open Modal
    // =====================================

    openModal() {

        this.modal.classList.add("active");

    },

    // =====================================
    // Close Modal
    // =====================================

    closeModal() {

        this.modal.classList.remove("active");

        this.form.reset();

    },

    // =====================================
    // Form Values
    // =====================================

    getFormData() {

        return {

            id: Date.now(),

            date: document.getElementById("date").value,

            description: document
                .getElementById("description")
                .value
                .trim(),

            category: document
                .getElementById("category")
                .value,

            type: document
                .getElementById("type")
                .value,

            amount: Number(

                document
                    .getElementById("amount")
                    .value

            )

        };

    },

    // =====================================
    // Validation
    // =====================================

    validate(transaction) {

        if (transaction.date === "") {

            Utils.showToast("Please select date.");

            return false;

        }

        if (transaction.description === "") {

            Utils.showToast("Description is required.");

            return false;

        }

        if (transaction.amount <= 0 || isNaN(transaction.amount)) {

            Utils.showToast("Amount should be greater than zero.");

            return false;

        }

        return true;

    },

    // =====================================
    // Add Transaction
    // =====================================

    addTransaction() {

        const transaction = this.getFormData();

        if (!this.validate(transaction)) {

            return;

        }

        Storage.addTransaction(transaction);

        this.transactions = Storage.getTransactions();

        this.closeModal();

        Dashboard.refresh();

        // These functions will be
        // implemented in Part 4B

        this.render();

        if (typeof ChartManager !== "undefined") {

            ChartManager.update();

        }

    },

    /* ==========================================================
   Part 4B
   Render & Delete Transactions
==========================================================*/

    // =====================================
    // Render Transactions
    // =====================================

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
        onclick="Transactions.editTransaction('${transaction.id}')">

        <i class="fa-solid fa-pen"></i>

    </button>

    <button
        class="delete-btn"
        onclick="Transactions.deleteTransaction('${transaction.id}')">

        <i class="fa-solid fa-trash"></i>

    </button>

</td>

            `;

            this.tableBody.appendChild(row);

        });

        this.attachDeleteEvents();

    },

    // =====================================
    // Delete Events
    // =====================================

    attachDeleteEvents() {

        const buttons = document.querySelectorAll(".delete-btn");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                this.deleteTransaction(id);

            });

        });

    },

    // =====================================
    // Delete Transaction
    // =====================================

    deleteTransaction(id) {

        const confirmed = confirm(

            "Delete this transaction?"

        );

        if (!confirmed) return;

        Storage.deleteTransaction(id);

        this.transactions = Storage.getTransactions();

        this.render();

        Dashboard.refresh();

        if (typeof ChartManager !== "undefined") {

            ChartManager.update();

        }

    },

    //  edit transactions 

    editTransaction(id) {

        const transactions = Storage.getTransactions();

        const transaction = transactions.find(t => t.id == id);

        if (!transaction) return;

        editingTransactionId = id;

        document.getElementById("date").value = transaction.date;

        document.getElementById("description").value = transaction.description;

        document.getElementById("category").value = transaction.category;

        document.getElementById("type").value = transaction.type;

        document.getElementById("amount").value = transaction.amount;

        document.querySelector(".modal-header h2").textContent = "Edit Transaction";

        document.querySelector(".save").innerHTML =

            `<i class="fa-solid fa-floppy-disk"></i> Save Changes`;

        document.getElementById("modal").classList.add("active");

    },

    // =====================================
    // Refresh Table
    // =====================================

    refresh() {

        this.transactions = Storage.getTransactions();

        this.render();

    },

    // =====================================
    // Helpers
    // =====================================

    capitalize(text) {

        return text.charAt(0).toUpperCase()

            + text.slice(1);

    },

    formatDate(date) {

        const options = {

            day: "2-digit",

            month: "short",

            year: "numeric"

        };

        return new Date(date)

            .toLocaleDateString(

                "en-IN",

                options

            );

    },

    /* ==========================================================
   Part 4C
   Search • Filter • Initialization
==========================================================*/

    // =====================================
    // Search Transactions
    // =====================================

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

    // =====================================
    // Filter Transactions
    // =====================================

    filter(type) {

        if (type === "all") {

            return this.transactions;

        }

        return this.transactions.filter(

            transaction => transaction.type === type

        );

    },

    // =====================================
    // Search + Filter Together
    // =====================================

    applyFilters() {

        const searchInput = document.getElementById("search");

        const filterSelect = document.getElementById("filter");

        let data = [...this.transactions];

        // Filter

        if (filterSelect.value !== "all") {

            data = data.filter(transaction =>

                transaction.type === filterSelect.value

            );

        }

        // Search

        const keyword = searchInput.value

            .toLowerCase()

            .trim();

        if (keyword !== "") {

            data = data.filter(transaction =>

                transaction.description
                    .toLowerCase()
                    .includes(keyword)

                ||

                transaction.category
                    .toLowerCase()
                    .includes(keyword)

            );

        }

        this.render(data);

    },

    // =====================================
    // Register Search & Filter Events
    // =====================================

    registerSearchFilterEvents() {

        const searchInput = document.getElementById("search");

        const filterSelect = document.getElementById("filter");

        searchInput.addEventListener(

            "input",

            () => this.applyFilters()

        );

        filterSelect.addEventListener(

            "change",

            () => this.applyFilters()

        );

    },

    // =====================================
    // Load Initial Data
    // =====================================

    load() {

        this.transactions = Storage.getTransactions();

        this.render();

    },

    // =====================================
    // Start Module
    // =====================================

    start() {

        this.init();

        this.load();

        this.registerSearchFilterEvents();

    }

};



