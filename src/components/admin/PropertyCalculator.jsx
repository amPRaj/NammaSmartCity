import { useState } from "react";
import { motion } from "framer-motion";
import { FiGrid, FiTrendingUp, FiDollarSign, FiHome, FiX } from "react-icons/fi";
import { calculatePropertyMetrics, calculateAffordability } from "../../services/calculationService";

const PropertyCalculator = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("investment");
    const [investmentData, setInvestmentData] = useState({
        price: "",
        monthlyRent: "",
        downPayment: "",
        interestRate: "7.5",
        loanTerm: "20",
        propertyTax: "1.2",
        insurance: "15000",
        maintenance: "1",
        vacancy: "5",
        appreciation: "6"
    });

    const [affordabilityData, setAffordabilityData] = useState({
        income: "",
        debts: "",
        downPayment: "",
        interestRate: "7.5",
        term: "20"
    });

    const [results, setResults] = useState(null);

    const handleInvestmentChange = (e) => {
        setInvestmentData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleAffordabilityChange = (e) => {
        setAffordabilityData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const calculateInvestment = () => {
        const data = {
            price: parseFloat(investmentData.price),
            monthlyRent: parseFloat(investmentData.monthlyRent),
            downPayment: parseFloat(investmentData.downPayment),
            interestRate: parseFloat(investmentData.interestRate),
            loanTerm: parseFloat(investmentData.loanTerm),
            propertyTax: parseFloat(investmentData.propertyTax),
            insurance: parseFloat(investmentData.insurance),
            maintenance: parseFloat(investmentData.maintenance),
            vacancy: parseFloat(investmentData.vacancy),
            appreciation: parseFloat(investmentData.appreciation)
        };

        const calculatedResults = calculatePropertyMetrics(data);
        setResults({ type: "investment", data: calculatedResults });
    };

    const calculateAffordabilityAnalysis = () => {
        const data = {
            income: parseFloat(affordabilityData.income),
            debts: parseFloat(affordabilityData.debts),
            downPayment: parseFloat(affordabilityData.downPayment),
            interestRate: parseFloat(affordabilityData.interestRate),
            term: parseFloat(affordabilityData.term)
        };

        const calculatedResults = calculateAffordability(
            data.income,
            data.debts,
            data.downPayment,
            data.interestRate,
            data.term
        );
        setResults({ type: "affordability", data: calculatedResults });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const ResultCard = ({ icon: Icon, title, value, color, subtitle }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white`}
        >
            <div className="flex items-center justify-between mb-2">
                <Icon className="text-2xl" />
                <span className="text-2xl font-bold">{value}</span>
            </div>
            <h3 className="font-semibold">{title}</h3>
            {subtitle && <p className="text-sm opacity-80 mt-1">{subtitle}</p>}
        </motion.div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <FiGrid className="text-2xl text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Property Calculator
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Left Panel - Input Forms */}
                    <div className="lg:w-1/2 p-6 border-r border-gray-200 dark:border-gray-700">
                        {/* Tabs */}
                        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
                            <button
                                onClick={() => setActiveTab("investment")}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "investment"
                                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                            >
                                Investment Analysis
                            </button>
                            <button
                                onClick={() => setActiveTab("affordability")}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "affordability"
                                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                            >
                                Affordability
                            </button>
                        </div>

                        {/* Investment Analysis Form */}
                        {activeTab === "investment" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Property Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={investmentData.price}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="5000000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Monthly Rent (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="monthlyRent"
                                            value={investmentData.monthlyRent}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="25000"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Down Payment (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="downPayment"
                                            value={investmentData.downPayment}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="1000000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Interest Rate (%)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="interestRate"
                                            value={investmentData.interestRate}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Loan Term (Years)
                                        </label>
                                        <input
                                            type="number"
                                            name="loanTerm"
                                            value={investmentData.loanTerm}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Property Tax (%)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="propertyTax"
                                            value={investmentData.propertyTax}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Insurance (₹/year)
                                        </label>
                                        <input
                                            type="number"
                                            name="insurance"
                                            value={investmentData.insurance}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Maintenance (%)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="maintenance"
                                            value={investmentData.maintenance}
                                            onChange={handleInvestmentChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={calculateInvestment}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                                >
                                    <FiGrid className="w-4 h-4" />
                                    <span>Calculate Investment</span>
                                </button>
                            </div>
                        )}

                        {/* Affordability Form */}
                        {activeTab === "affordability" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Annual Income (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="income"
                                        value={affordabilityData.income}
                                        onChange={handleAffordabilityChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="1200000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Annual Debts (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="debts"
                                        value={affordabilityData.debts}
                                        onChange={handleAffordabilityChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="120000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Down Payment (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="downPayment"
                                        value={affordabilityData.downPayment}
                                        onChange={handleAffordabilityChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="500000"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Interest Rate (%)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="interestRate"
                                            value={affordabilityData.interestRate}
                                            onChange={handleAffordabilityChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Loan Term (Years)
                                        </label>
                                        <input
                                            type="number"
                                            name="term"
                                            value={affordabilityData.term}
                                            onChange={handleAffordabilityChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={calculateAffordabilityAnalysis}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                                >
                                    <FiHome className="w-4 h-4" />
                                    <span>Calculate Affordability</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Results */}
                    <div className="lg:w-1/2 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Calculation Results
                        </h3>

                        {results ? (
                            <div className="space-y-4">
                                {results.type === "investment" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <ResultCard
                                                icon={FiDollarSign}
                                                title="Monthly Cash Flow"
                                                value={formatCurrency(results.data.monthlyCashFlow)}
                                                color="from-green-500 to-green-600"
                                                subtitle={results.data.monthlyCashFlow > 0 ? "Positive Cash Flow" : "Negative Cash Flow"}
                                            />
                                            <ResultCard
                                                icon={FiTrendingUp}
                                                title="Cash-on-Cash Return"
                                                value={`${results.data.cashOnCashReturn}%`}
                                                color="from-blue-500 to-blue-600"
                                                subtitle="Annual Return on Investment"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <ResultCard
                                                icon={FiHome}
                                                title="Cap Rate"
                                                value={`${results.data.capRate}%`}
                                                color="from-purple-500 to-purple-600"
                                                subtitle="Property Yield"
                                            />
                                            <ResultCard
                                                icon={FiGrid}
                                                title="1% Rule"
                                                value={`${results.data.onePercentRule}%`}
                                                color="from-orange-500 to-orange-600"
                                                subtitle={results.data.onePercentRule >= 1 ? "Meets 1% Rule" : "Below 1% Rule"}
                                            />
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Monthly Expense Breakdown</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Mortgage Payment:</span>
                                                    <span>{formatCurrency(results.data.breakdownExpenses.mortgage)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Property Tax:</span>
                                                    <span>{formatCurrency(results.data.breakdownExpenses.propertyTax)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Insurance:</span>
                                                    <span>{formatCurrency(results.data.breakdownExpenses.insurance)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Maintenance:</span>
                                                    <span>{formatCurrency(results.data.breakdownExpenses.maintenance)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Vacancy Loss:</span>
                                                    <span>{formatCurrency(results.data.breakdownExpenses.vacancy)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {results.type === "affordability" && (
                                    <div className="grid grid-cols-1 gap-4">
                                        <ResultCard
                                            icon={FiHome}
                                            title="Max Home Price"
                                            value={formatCurrency(results.data.maxHomePrice)}
                                            color="from-green-500 to-green-600"
                                            subtitle="Maximum affordable property price"
                                        />
                                        <ResultCard
                                            icon={FiDollarSign}
                                            title="Max Monthly Payment"
                                            value={formatCurrency(results.data.maxMonthlyPayment)}
                                            color="from-blue-500 to-blue-600"
                                            subtitle="Maximum monthly mortgage payment"
                                        />
                                        <ResultCard
                                            icon={FiGrid}
                                            title="Max Loan Amount"
                                            value={formatCurrency(results.data.maxLoanAmount)}
                                            color="from-purple-500 to-purple-600"
                                            subtitle="Maximum loan you can qualify for"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FiGrid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">
                                    Enter property details and click calculate to see results
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PropertyCalculator;