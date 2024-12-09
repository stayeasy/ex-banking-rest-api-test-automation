const express = require('express');
const bodyParser = require('body-parser');

class ExBankingService {
    constructor() {
        this.users = new Map();
    }

    createUser(username) {
        if (this.users.has(username)) {
            throw new Error('User already exists');
        }
        this.users.set(username, { balance: 0 });
        return true;
    }

    deposit(username, amount) {
        if (!this.users.has(username)) {
            throw new Error('User not found');
        }
        if (amount <= 0) {
            throw new Error('Invalid deposit amount');
        }
        const user = this.users.get(username);
        user.balance += amount;
        return user.balance;
    }

    withdraw(username, amount) {
        if (!this.users.has(username)) {
            throw new Error('User not found');
        }
        const user = this.users.get(username);
        if (amount <= 0) {
            throw new Error('Invalid withdrawal amount');
        }
        if (user.balance < amount) {
            throw new Error('Insufficient funds');
        }
        user.balance -= amount;
        return user.balance;
    }

    getBalance(username) {
        if (!this.users.has(username)) {
            throw new Error('User not found');
        }
        return this.users.get(username).balance;
    }

    send(fromUsername, toUsername, amount) {
        if (fromUsername === toUsername) {
            throw new Error('Cannot send money to the same user');
        }
        if (!this.users.has(fromUsername) || !this.users.has(toUsername)) {
            throw new Error('One or both users not found');
        }
        if (amount <= 0) {
            throw new Error('Invalid transfer amount');
        }
        const sender = this.users.get(fromUsername);
        const receiver = this.users.get(toUsername);

        if (sender.balance < amount) {
            throw new Error('Insufficient funds');
        }

        sender.balance -= amount;
        receiver.balance += amount;
        return {
            fromBalance: sender.balance,
            toBalance: receiver.balance
        };
    }
}

const bankingService = new ExBankingService();

const app = express();
app.use(bodyParser.json());

// Create User
app.post('/users', (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const result = bankingService.createUser(username);
        res.status(201).json({ success: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deposit
app.post('/deposit', (req, res) => {
    try {
        const { username, amount } = req.body;
        if (!username || amount === undefined) {
            return res.status(400).json({ error: 'Username and amount are requiired' });
        }
        const newBalance = bankingService.deposit(username, amount);
        res.json({ newBalance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Withdraw
app.post('/withdraw', (req, res) => {
    try {
        const { username, amount } = req.body;
        if (!username || amount === undefined) {
            return res.status(400).json({ error: 'Username and amount are requiired' });
        }
        const newBalance = bankingService.withdraw(username, amount);
        res.json({ newBalance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Balance
app.get('/balance/:username', (req, res) => {
    try {
        const { username } = req.params;
        const balance = bankingService.getBalance(username);
        res.json({ balance });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Send Money
app.post('/send', (req, res) => {
    try {
        const { fromUsername, toUsername, amount } = req.body;
        if (!fromUsername || !toUsername || amount === undefined) {
            return res.status(400).json({ error: 'From, to username and amount are required' });
        }
        const result = bankingService.send(fromUsername, toUsername, amount);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = { app, bankingService };