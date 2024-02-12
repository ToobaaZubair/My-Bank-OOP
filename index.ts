


import inquirer from "inquirer";

class Account {
    private accountNumber: number;
    private ownerName: string;
    private balance: number;

    constructor(accountNumber: number, ownerName: string, balance: number) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposit of ${amount} successfully processed. Current balance is ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log(`Insufficient balance`);
        } else {
            this.balance -= amount;
            console.log(`Withdraw ${amount} successfully, Remaining balance is ${this.balance}`);
        }
    }

    checkBalance(): void {
        console.log(`Total balance of ${this.ownerName} is ${this.balance}`);
    }
}

class Bank {
    private accounts: { [accountNumber: number]: Account } = {};

    async createAccount(): Promise<void> {
        const accountNumber = Math.floor(Math.random() * 10000); 
        const accDetails = await inquirer.prompt([
            {
                type: "input",
                name: "ownerName",
                message: "Enter your Owner Name"
            }
        ]);
        const { ownerName } = accDetails;
        const balance = 0; 
        this.accounts[accountNumber] = new Account(accountNumber, ownerName, balance);
        console.log(`Account created for ${ownerName} successfully. Account number: ${accountNumber}`);
    }

    async performTransactions(accountNumber: number): Promise<void> {
        const account = this.accounts[accountNumber];
        if (!account) {
            console.log("Account not found.");
            return;
        }

        const { transactions } = await inquirer.prompt({
            type: "list",
            name: "transactions",
            message: "What would you like to do?",
            choices: ["Withdraw", "Deposit", "Check Balance"]
        });

        switch (transactions) {
            case "Withdraw": {
                const { withdrawAmount } = await inquirer.prompt({
                    type: "input",
                    name: "withdrawAmount",
                    message: "Enter the amount to withdraw:"
                });
                account.withdraw((withdrawAmount));
                break;
            }
            case "Deposit": {
                const { depositAmount } = await inquirer.prompt({
                    type: "input",
                    name: "depositAmount",
                    message: "Enter the amount to deposit:"
                });
                account.deposit((depositAmount));
                break;
            }
            case "Check Balance": {
                account.checkBalance();
                break;
            }
        }
    }
}

async function main() {
    const bank = new Bank();
    while (true) {
        const { actions } = await inquirer.prompt({
            type: "list",
            name: "actions",
            message: "What would you like to do?",
            choices: ["Create Account", "Transactions", "Exit"]
        });
        switch (actions) {
            case "Create Account":
                await bank.createAccount();
                break;
            case "Transactions": {
                const { accountNumber } = await inquirer.prompt({
                    type: "input",
                    name: "accountNumber",
                    message: "Enter your account number:"
                });
                await bank.performTransactions((accountNumber));
                break;
            }
            case "Exit":
                console.log(`Exiting....`);
                return;
        }
    }
}

main();
