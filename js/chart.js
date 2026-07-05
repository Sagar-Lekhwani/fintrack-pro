/* ==========================================================
   FinTrack Pro
   chart.js
   Handles Cash Flow Analysis
==========================================================*/

const ChartManager = {

    chart: null,

    // =====================================
    // Initialize Chart
    // =====================================

    init() {

        const canvas = document.getElementById("cashChart");

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        this.chart = new Chart(ctx, {

            type: "line",

            data: {

                labels: [],

                datasets: [

                    {

                        label: "Income",

                        data: [],

                        borderColor: "#16a34a",

                        backgroundColor: "rgba(22,163,74,.12)",

                        fill: true,

                        tension: .4,

                        borderWidth: 3,

                        pointRadius: 5,

                        pointHoverRadius: 7

                    },

                    {

                        label: "Expense",

                        data: [],

                        borderColor: "#dc2626",

                        backgroundColor: "rgba(220,38,38,.12)",

                        fill: true,

                        tension: .4,

                        borderWidth: 3,

                        pointRadius: 5,

                        pointHoverRadius: 7

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {

                    intersect: false,

                    mode: "index"

                },

                plugins: {

                    legend: {

                        position: "top"

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

        this.update();

    },

    // =====================================
    // Update Chart
    // =====================================

    update() {

        if (!this.chart) return;

        const transactions = Storage.getTransactions();

        const incomeMap = {};

        const expenseMap = {};

        transactions.forEach(transaction => {

            const date = transaction.date;

            if (transaction.type === "income") {

                incomeMap[date] =

                    (incomeMap[date] || 0)

                    + Number(transaction.amount);

            }

            else {

                expenseMap[date] =

                    (expenseMap[date] || 0)

                    + Number(transaction.amount);

            }

        });

        const labels = [

            ...new Set([

                ...Object.keys(incomeMap),

                ...Object.keys(expenseMap)

            ])

        ].sort();

        const incomeData = labels.map(

            date => incomeMap[date] || 0

        );

        const expenseData = labels.map(

            date => expenseMap[date] || 0

        );

        this.chart.data.labels = labels;

        this.chart.data.datasets[0].data = incomeData;

        this.chart.data.datasets[1].data = expenseData;

        this.chart.update();

    },

    // =====================================
    // Destroy Chart
    // =====================================

    destroy() {

        if (this.chart) {

            this.chart.destroy();

            this.chart = null;

        }

    }

};