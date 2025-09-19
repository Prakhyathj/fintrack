// Shared Data Manager for Smart Finance Tracker
// This manages all data across dashboard and transaction pages

class FinanceDataManager {
    constructor() {
        // Load data from localStorage or use default data
        this.data = this.loadFromStorage() || {
            user: {
                name: "Demo User",
                email: "demo@example.com",
                currency: "INR"
            },
            bankAccounts: [
                { id: 1, name: "HDFC Savings", accountNumber: "****1234", type: "Savings", balance: 45000, bank: "HDFC Bank" },
                { id: 2, name: "SBI Current", accountNumber: "****5678", type: "Current", balance: 25000, bank: "State Bank of India" },
                { id: 3, name: "ICICI Credit Card", accountNumber: "****9012", type: "Credit Card", balance: -8500, bank: "ICICI Bank", creditLimit: 50000 }
            ],
            transactions: [
                { id: 1, type: "income", amount: 45000, category: "Salary", description: "Monthly Salary", date: "2024-08-01", accountId: 1, isRecurring: true },
                { id: 2, type: "expense", amount: 12000, category: "Rent", description: "House Rent", date: "2024-08-02", accountId: 1, isRecurring: true },
                { id: 3, type: "expense", amount: 3500, category: "Groceries", description: "Monthly Groceries", date: "2024-08-03", accountId: 1, isRecurring: false },
                { id: 4, type: "expense", amount: 1500, category: "Utilities", description: "Electricity Bill", date: "2024-08-04", accountId: 1, isRecurring: true },
                { id: 5, type: "investment", amount: 15000, category: "Stocks", description: "Purchased RELIANCE shares", date: "2024-08-05", accountId: 1, stockSymbol: "RELIANCE" },
                { id: 6, type: "expense", amount: 2500, category: "Food", description: "Restaurant & Dining", date: "2024-08-06", accountId: 3, isRecurring: false },
                { id: 7, type: "income", amount: 5000, category: "Freelance", description: "Web Development Project", date: "2024-08-07", accountId: 2, isRecurring: false },
                { id: 8, type: "expense", amount: 800, category: "Transportation", description: "Fuel & Metro", date: "2024-08-08", accountId: 1, isRecurring: false },
                { id: 9, type: "expense", amount: 450, category: "Food", description: "Lunch", date: "2024-08-22", accountId: 1, isRecurring: false },
                { id: 10, type: "expense", amount: 2340, category: "Groceries", description: "Weekly Groceries", date: "2024-08-21", accountId: 1, isRecurring: false }
            ],
            stockPortfolio: [
                { id: 1, symbol: "RELIANCE", companyName: "Reliance Industries Ltd", quantity: 25, avgPrice: 2450.50, currentPrice: 2678.25, sector: "Energy" },
                { id: 2, symbol: "TCS", companyName: "Tata Consultancy Services", quantity: 15, avgPrice: 3567.80, currentPrice: 3789.45, sector: "IT" },
                { id: 3, symbol: "HDFC", companyName: "HDFC Bank Limited", quantity: 30, avgPrice: 1567.20, currentPrice: 1634.75, sector: "Banking" }
            ],
            categories: {
                income: [
                    { id: 1, name: "Salary", icon: "fas fa-briefcase", color: "#28a745" },
                    { id: 2, name: "Freelance", icon: "fas fa-laptop-code", color: "#17a2b8" },
                    { id: 3, name: "Investment Returns", icon: "fas fa-chart-line", color: "#ffc107" },
                    { id: 4, name: "Other", icon: "fas fa-plus-circle", color: "#6c757d" }
                ],
                expense: [
                    { id: 1, name: "Rent", icon: "fas fa-home", color: "#dc3545" },
                    { id: 2, name: "Groceries", icon: "fas fa-shopping-cart", color: "#fd7e14" },
                    { id: 3, name: "Utilities", icon: "fas fa-bolt", color: "#20c997" },
                    { id: 4, name: "Food", icon: "fas fa-utensils", color: "#e83e8c" },
                    { id: 5, name: "Transportation", icon: "fas fa-car", color: "#6f42c1" },
                    { id: 6, name: "Entertainment", icon: "fas fa-film", color: "#fd7e14" },
                    { id: 7, name: "Healthcare", icon: "fas fa-heartbeat", color: "#dc3545" },
                    { id: 8, name: "Shopping", icon: "fas fa-shopping-bag", color: "#e83e8c" },
                    { id: 9, name: "Other", icon: "fas fa-ellipsis-h", color: "#6c757d" }
                ]
            }
        };

        // Event listeners for data changes
        this.listeners = [];
        
        // Save initial data to storage
        this.saveToStorage();
    }

    // Storage methods
    saveToStorage() {
        try {
            localStorage.setItem('financeTracker_data', JSON.stringify(this.data));
        } catch (error) {
            console.error('Failed to save data to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('financeTracker_data');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to load data from localStorage:', error);
            return null;
        }
    }

    // Subscribe to data changes
    subscribe(callback) {
        this.listeners.push(callback);
    }

    // Notify all listeners of data changes
    notify(changeType, data) {
        this.listeners.forEach(callback => callback(changeType, data));
        // Save to storage after any data change
        this.saveToStorage();
    }

    // Transaction methods
    getAllTransactions() {
        return [...this.data.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    addTransaction(transaction) {
        const newId = Math.max(...this.data.transactions.map(t => t.id), 0) + 1;
        const newTransaction = { ...transaction, id: newId };
        this.data.transactions.unshift(newTransaction);

        // Update account balance
        this.updateAccountBalance(transaction.accountId, transaction.type, transaction.amount);

        this.notify('transaction_added', newTransaction);
        return newTransaction;
    }

    updateTransaction(id, updates) {
        const index = this.data.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            this.data.transactions[index] = { ...this.data.transactions[index], ...updates };
            this.notify('transaction_updated', this.data.transactions[index]);
            return this.data.transactions[index];
        }
        return null;
    }

    deleteTransaction(id) {
        const transaction = this.data.transactions.find(t => t.id === id);
        if (transaction) {
            this.data.transactions = this.data.transactions.filter(t => t.id !== id);

            // Reverse the account balance change
            const reverseType = transaction.type === 'income' ? 'expense' : 'income';
            this.updateAccountBalance(transaction.accountId, reverseType, transaction.amount);

            this.notify('transaction_deleted', transaction);
            return true;
        }
        return false;
    }

    // Account methods
    getAllAccounts() {
        return this.data.bankAccounts;
    }

    getAccountById(id) {
        return this.data.bankAccounts.find(acc => acc.id === id);
    }

    updateAccountBalance(accountId, transactionType, amount) {
        const account = this.getAccountById(accountId);
        if (account) {
            if (transactionType === 'income') {
                account.balance += amount;
            } else if (transactionType === 'expense') {
                account.balance -= amount;
            }
            this.notify('account_updated', account);
        }
    }

    // Method to reset data to initial state (useful for testing)
    resetData() {
        localStorage.removeItem('financeTracker_data');
        window.location.reload();
    }

    // Category methods
    getCategories() {
        return this.data.categories;
    }

    getCategoriesByType(type) {
        return this.data.categories[type] || [];
    }

    // Stock portfolio methods
    getStockPortfolio() {
        return this.data.stockPortfolio;
    }

    // Statistics methods
    getMonthlyStats(month = null) {
        const targetMonth = month || new Date().toISOString().slice(0, 7); // YYYY-MM format

        const monthlyTransactions = this.data.transactions.filter(t => 
            t.date.startsWith(targetMonth)
        );

        const income = monthlyTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = monthlyTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const investments = monthlyTransactions
            .filter(t => t.type === 'investment')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income,
            expenses,
            investments,
            savings: income - expenses,
            transactionCount: monthlyTransactions.length,
            netAmount: income - expenses - investments
        };
    }

    getRecentTransactions(limit = 5) {
        return this.getAllTransactions().slice(0, limit);
    }

    getTotalBankBalance() {
        return this.data.bankAccounts
            .filter(acc => acc.type !== 'Credit Card')
            .reduce((total, acc) => total + acc.balance, 0);
    }

    getPortfolioValue() {
        return this.data.stockPortfolio.reduce((total, stock) => {
            return total + (stock.quantity * stock.currentPrice);
        }, 0);
    }

    getPortfolioGainLoss() {
        const totalInvestment = this.data.stockPortfolio.reduce((total, stock) => {
            return total + (stock.quantity * stock.avgPrice);
        }, 0);
        const currentValue = this.getPortfolioValue();
        return {
            amount: currentValue - totalInvestment,
            percentage: totalInvestment > 0 ? ((currentValue - totalInvestment) / totalInvestment) * 100 : 0
        };
    }
}

// Create global instance
const financeData = new FinanceDataManager();

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FinanceDataManager, financeData };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.financeData = financeData;
    window.FinanceDataManager = FinanceDataManager;
}