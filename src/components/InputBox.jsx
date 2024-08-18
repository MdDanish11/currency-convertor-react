import React, { useId, useState } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredCurrencies = currencyOptions.filter(currency =>
        currency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCurrency = (currency) => {
        onCurrencyChange(currency);
        setSearchTerm(''); // Clear the search term after selecting a currency
        setIsDropdownOpen(false); // Close the dropdown
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-col justify-end relative">
                <p className="text-black/40 mb-2 w-full text-right">Currency Type</p>
                <div className="relative flex flex-col items-end">
                    <div
                        className="cursor-pointer bg-gray-100 rounded-lg px-2 py-1 flex items-center justify-between text-xs mb-1"
                        onClick={toggleDropdown}
                        style={{ width: '50%' }} // Slightly smaller width for the display box
                    >
                        {selectCurrency.toUpperCase()}
                        <span className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                            
                        </span>
                    </div>
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1"
                            style={{ width: '50%' }}  // Slightly smaller width for the dropdown list
                        >
                            <input
                                type="text"
                                className="w-full px-2 py-1 border-b border-gray-200 text-xs" // Reduced text size and padding
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <ul className="max-h-32 overflow-y-auto text-xs"> {/* Reduced height */}
                                {filteredCurrencies.length > 0 ? (
                                    filteredCurrencies.map(currency => (
                                        <li
                                            key={currency}
                                            className="px-2 py-1 cursor-pointer hover:bg-blue-600 hover:text-white"
                                            onClick={() => handleSelectCurrency(currency)}
                                        >
                                            {currency.toUpperCase()}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-2 py-1 text-blue-600">No currency found</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InputBox;
