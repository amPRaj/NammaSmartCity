// Property Investment Calculator Service

export const calculatePropertyMetrics = (propertyData) => {
  const {
    price,
    monthlyRent,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    insurance,
    maintenance,
    vacancy,
    appreciation
  } = propertyData;

  // Basic calculations
  const loanAmount = price - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Monthly mortgage payment
  const monthlyMortgage = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Monthly expenses
  const monthlyPropertyTax = (propertyTax / 100 * price) / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyMaintenance = (maintenance / 100 * price) / 12;
  const vacancyLoss = (vacancy / 100 * monthlyRent);

  const totalMonthlyExpenses = monthlyMortgage + monthlyPropertyTax + 
    monthlyInsurance + monthlyMaintenance + vacancyLoss;

  // Cash flow
  const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;

  // ROI calculations
  const totalCashInvested = downPayment;
  const cashOnCashReturn = (annualCashFlow / totalCashInvested) * 100;

  // Cap rate
  const netOperatingIncome = (monthlyRent * 12) - 
    (monthlyPropertyTax * 12 + monthlyInsurance + monthlyMaintenance * 12);
  const capRate = (netOperatingIncome / price) * 100;

  // 1% rule check
  const onePercentRule = (monthlyRent / price) * 100;

  // Future value with appreciation
  const futureValue = price * Math.pow(1 + appreciation / 100, 10);
  const totalAppreciation = futureValue - price;

  return {
    monthlyMortgage: Math.round(monthlyMortgage),
    monthlyExpenses: Math.round(totalMonthlyExpenses),
    monthlyCashFlow: Math.round(monthlyCashFlow),
    annualCashFlow: Math.round(annualCashFlow),
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    onePercentRule: Math.round(onePercentRule * 100) / 100,
    netOperatingIncome: Math.round(netOperatingIncome),
    futureValue: Math.round(futureValue),
    totalAppreciation: Math.round(totalAppreciation),
    totalReturn: Math.round(annualCashFlow * 10 + totalAppreciation),
    breakdownExpenses: {
      mortgage: Math.round(monthlyMortgage),
      propertyTax: Math.round(monthlyPropertyTax),
      insurance: Math.round(monthlyInsurance),
      maintenance: Math.round(monthlyMaintenance),
      vacancy: Math.round(vacancyLoss)
    }
  };
};

export const calculateROI = (initialInvestment, currentValue, timeHeld) => {
  const totalReturn = currentValue - initialInvestment;
  const roi = (totalReturn / initialInvestment) * 100;
  const annualizedROI = Math.pow(currentValue / initialInvestment, 1 / timeHeld) - 1;
  
  return {
    totalReturn: Math.round(totalReturn),
    roi: Math.round(roi * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 10000) / 100
  };
};

export const calculateMortgagePayment = (principal, rate, years) => {
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
  return Math.round(monthlyPayment);
};

export const calculateAffordability = (income, debts, downPayment, interestRate, term) => {
  const monthlyIncome = income / 12;
  const monthlyDebts = debts / 12;
  const maxMonthlyPayment = (monthlyIncome * 0.28) - monthlyDebts; // 28% rule
  
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = term * 12;
  
  const maxLoanAmount = maxMonthlyPayment * 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1) /
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
    
  const maxHomePrice = maxLoanAmount + downPayment;
  
  return {
    maxMonthlyPayment: Math.round(maxMonthlyPayment),
    maxLoanAmount: Math.round(maxLoanAmount),
    maxHomePrice: Math.round(maxHomePrice)
  };
};