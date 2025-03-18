const express = require("express");
const app = express();
app.use(express.json());

const creditForm = document.getElementById("creditForm");
if (creditForm) {
    creditForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let income = parseFloat(document.getElementById("income").value);
    let savings = parseFloat(document.getElementById("savings").value);
    let loanHistory = parseInt(document.getElementById("loanHistory").value);
    let businessRevenue = parseFloat(document.getElementById("businessRevenue").value);
    let educationLevel = parseInt(document.getElementById("educationLevel").value);

    let score = 0;

    // AI-based credit score calculation
    score += (income > 500) ? 20 : (income > 300) ? 10 : 0;
    score += (savings > 1000) ? 25 : (savings > 500) ? 15 : 0;
    score += (loanHistory > 2) ? 20 : (loanHistory > 0) ? 10 : 0;
    score += (businessRevenue > 2000) ? 20 : (businessRevenue > 1000) ? 10 : 0;
    score += educationLevel * 5;

    let resultText = (score >= 50) ? "✅ Loan Approved!" : "❌ Loan Denied!";
    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.innerText = resultText;
    }
    //API END POINT
    app.post("/apply-loan", (req, res) => {
        const { income, savings, loanHistory, businessRevenue, educationLevel } = req.body;
        const isLoanApproved = score >= 50;
        res.json({ loanStatus: isLoanApproved });
    });

    // Close the if block
    });
}

// API ENDPOINT
app.post("/apply-loan", (req, res) => {
    const { income, savings, loanHistory, businessRevenue, educationLevel } = req.body;
    let score = 0;

    score += (income > 500) ? 20 : (income > 300) ? 10 : 0;
    score += (savings > 1000) ? 25 : (savings > 500) ? 15 : 0;
    score += (loanHistory > 2) ? 20 : (loanHistory > 0) ? 10 : 0;
    score += (businessRevenue > 2000) ? 20 : (businessRevenue > 1000) ? 10 : 0;
    score += educationLevel * 5;

    const isLoanApproved = score >= 50;
    res.json({ loanStatus: isLoanApproved });
});

const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
