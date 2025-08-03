import { useState } from "react";
import { motion } from "framer-motion";
import {
    FiGrid,
    FiHome,
    FiMapPin,
    FiDollarSign,
    FiX,
    FiSave,
    FiPrinter
} from "react-icons/fi";

const PropertyEstimation = ({ onClose }) => {
    const [estimation, setEstimation] = useState({
        propertyName: "",
        location: "",
        sqft: "",
        ratePerSqft: "2600", // Default rate
        siteValue: "4000000", // Default site value
        additionalCosts: {
            registration: "",
            stampDuty: "",
            brokerage: "",
            legalCharges: "",
            otherCharges: ""
        },
        notes: ""
    });

    const [result, setResult] = useState(null);
    const [savedEstimations, setSavedEstimations] = useState([]);

    const handleInputChange = (field, value) => {
        setEstimation(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAdditionalCostChange = (field, value) => {
        setEstimation(prev => ({
            ...prev,
            additionalCosts: {
                ...prev.additionalCosts,
                [field]: value
            }
        }));
    };

    const calculateEstimation = () => {
        const sqft = parseFloat(estimation.sqft) || 0;
        const ratePerSqft = parseFloat(estimation.ratePerSqft) || 0;
        const siteValueInLakhs = parseFloat(estimation.siteValue) || 0;

        // Keep calculations in lakhs for site value
        const constructionCostInRupees = sqft * ratePerSqft;
        const constructionCostInLakhs = constructionCostInRupees / 100000; // Convert to lakhs

        // Base value in lakhs
        const baseValueInLakhs = constructionCostInLakhs + siteValueInLakhs;
        const baseValueInRupees = baseValueInLakhs * 100000;

        // Additional costs (in rupees)
        const additionalCosts = Object.values(estimation.additionalCosts)
            .reduce((sum, cost) => sum + (parseFloat(cost) || 0), 0);
        const additionalCostsInLakhs = additionalCosts / 100000;

        const totalValueInLakhs = baseValueInLakhs + additionalCostsInLakhs;
        const totalValueInRupees = totalValueInLakhs * 100000;

        // Calculate GST and final value
        const gstAmount = baseValueInRupees * 0.05; // 5% GST on base value
        const gstAmountInLakhs = gstAmount / 100000;
        // Final value is just the base value (Construction + Site) without GST
        const finalValueInLakhs = baseValueInLakhs;
        const finalValueInRupees = baseValueInRupees;

        const breakdown = {
            constructionCost: constructionCostInRupees,
            constructionCostInLakhs: constructionCostInLakhs,
            siteValue: siteValueInLakhs * 100000, // Convert to rupees for calculation display
            siteValueInLakhs: siteValueInLakhs, // Keep lakhs value for lakhs display
            siteValueInRupees: siteValueInLakhs * 100000, // For detailed breakdown
            additionalCosts: additionalCosts,
            additionalCostsInLakhs: additionalCostsInLakhs,
            baseValue: baseValueInRupees,
            baseValueInLakhs: baseValueInLakhs,
            totalValue: totalValueInRupees,
            totalValueInLakhs: totalValueInLakhs,
            pricePerSqft: sqft > 0 ? finalValueInRupees / sqft : 0,
            gst: gstAmount,
            gstInLakhs: gstAmountInLakhs,
            finalValue: finalValueInRupees,
            finalValueInLakhs: finalValueInLakhs
        };

        setResult({
            ...estimation,
            ...breakdown,
            calculatedAt: new Date().toISOString()
        });
    };

    const saveEstimation = () => {
        if (result) {
            const newEstimation = {
                id: Date.now(),
                ...result,
                savedAt: new Date().toISOString()
            };
            setSavedEstimations(prev => [newEstimation, ...prev]);
            alert("Estimation saved successfully!");
        }
    };

    const printEstimation = () => {
        if (result) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Property Estimation - ${result.propertyName}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .header { text-align: center; margin-bottom: 30px; }
                            .section { margin-bottom: 20px; }
                            .calculation { background: #f5f5f5; padding: 15px; border-radius: 5px; }
                            .total { font-size: 18px; font-weight: bold; color: #2563eb; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>Namma Smart City Properties</h1>
                            <h2>Property Estimation Report</h2>
                        </div>
                        <div class="section">
                            <h3>Property Details</h3>
                            <p><strong>Property Name:</strong> ${result.propertyName}</p>
                            <p><strong>Location:</strong> ${result.location}</p>
                            <p><strong>Area:</strong> ${result.sqft} sq ft</p>
                        </div>
                        <div class="calculation">
                            <h3>Calculation Breakdown</h3>
                            <p>Construction Cost: ${result.sqft} sq ft × ₹${result.ratePerSqft} = ₹${result.constructionCost.toLocaleString()}</p>
                            <p>Site Value: ₹${result.siteValue.toLocaleString()}</p>
                            <p>Additional Costs: ₹${result.additionalCosts.toLocaleString()}</p>
                            <p>Base Value: ₹${result.baseValue.toLocaleString()}</p>
                            <p>GST (5%): ₹${result.gst.toLocaleString()}</p>
                            <p class="total">Final Estimated Value: ₹${result.finalValue.toLocaleString()}</p>
                        </div>
                        <div class="section">
                            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="w-full min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full overflow-hidden mx-4 my-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <FiGrid className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Property Estimation Calculator
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Calculate accurate property valuations and generate estimates
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FiX className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </button>
                </div>

                <div className="flex overflow-hidden">
                    {/* Input Form */}
                    <div className="flex-1 p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
                        <div className="max-w-4xl mx-auto">
                            {/* Calculation Parameters Only */}
                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-8 border border-emerald-200 dark:border-emerald-700">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center justify-center">
                                    📊 Calculation Parameters
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                            📐 Area (sq ft)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={estimation.sqft}
                                                onChange={(e) => handleInputChange('sqft', e.target.value)}
                                                className="w-full p-5 pr-20 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all text-xl font-medium"
                                                placeholder="1200"
                                                min="0"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">sq ft</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">Built-up area of the property</p>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                            💰 Rate per sq ft (₹)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={estimation.ratePerSqft}
                                                onChange={(e) => handleInputChange('ratePerSqft', e.target.value)}
                                                className="w-full p-5 pr-20 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all text-xl font-medium"
                                                placeholder="2600"
                                                min="0"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">₹/sq ft</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">Construction cost per square foot</p>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                            🏞️ Site Value (₹ in Lakhs)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={estimation.siteValue}
                                                onChange={(e) => handleInputChange('siteValue', e.target.value)}
                                                className="w-full p-5 pr-20 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all text-xl font-medium"
                                                placeholder="40"
                                                min="0"
                                                step="0.1"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">Lakhs</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">Land/plot value in lakhs</p>
                                    </div>
                                </div>

                                {/* Quick Calculation Preview */}
                                {estimation.sqft && estimation.ratePerSqft && estimation.siteValue && (
                                    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-emerald-300 dark:border-emerald-600 shadow-lg">
                                        <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold text-center">
                                            <strong>Quick Preview:</strong> Construction: ₹{(parseFloat(estimation.sqft) * parseFloat(estimation.ratePerSqft)).toLocaleString()} + Site: ₹{(parseFloat(estimation.siteValue) * 100000).toLocaleString()} = <span className="text-2xl text-blue-600 dark:text-blue-400 font-bold">₹{((parseFloat(estimation.sqft) * parseFloat(estimation.ratePerSqft)) + (parseFloat(estimation.siteValue) * 100000)).toLocaleString()}</span>
                                        </p>
                                    </div>
                                )}

                                {/* Calculate Button */}
                                <div className="mt-10">
                                    <button
                                        onClick={calculateEstimation}
                                        disabled={!estimation.sqft || !estimation.ratePerSqft || !estimation.siteValue}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-200 flex items-center justify-center space-x-4 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none"
                                    >
                                        <FiGrid className="w-7 h-7" />
                                        <span>Calculate Property Estimation</span>
                                    </button>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center font-medium">
                                        Fill all three fields to calculate estimation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    {result && (
                        <div className="w-96 bg-gray-50 dark:bg-gray-700 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Estimation Result
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={saveEstimation}
                                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                            title="Save Estimation"
                                        >
                                            <FiSave className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={printEstimation}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                            title="Print Estimation"
                                        >
                                            <FiPrinter className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                                    <div className="text-center border-b pb-3">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {result.propertyName || "Property Estimation"}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {result.location}
                                        </p>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Area:</span>
                                            <span className="font-medium">{result.sqft} sq ft</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Rate per sq ft:</span>
                                            <span className="font-medium">₹{result.ratePerSqft}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Construction Cost:</span>
                                            <span className="font-medium">{formatCurrency(result.constructionCost)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Site Value:</span>
                                            <span className="font-medium">{formatCurrency(result.siteValue)}</span>
                                        </div>
                                        {result.additionalCosts > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Additional Costs:</span>
                                                <span className="font-medium">{formatCurrency(result.additionalCosts)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="text-gray-600 dark:text-gray-400">Base Value:</span>
                                            <span className="font-medium">{formatCurrency(result.baseValue)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">GST (5%):</span>
                                            <span className="font-medium">{formatCurrency(result.gst)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 text-lg font-bold text-blue-600">
                                            <span>Final Value:</span>
                                            <span>{formatCurrency(result.finalValue)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>Price per sq ft:</span>
                                            <span>₹{Math.round(result.pricePerSqft)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Formula Display */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Calculation Formula:
                                    </h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        ({result.sqft} × ₹{result.ratePerSqft}) + ₹{result.siteValue} + Additional Costs + GST
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PropertyEstimation;