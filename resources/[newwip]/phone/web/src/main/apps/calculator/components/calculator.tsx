import React from 'react';
import '../../../index.css';
import { Calculator } from 'react-mac-calculator';

const CalculatorApp: React.FC = () => {
    return (
        <>
            <div className="calculator-outer-container" style={{ zIndex: 500 }}>
                <div className="calculator-container" style={{ zIndex: 500 }}>
                    <Calculator />
                </div>
            </div>
        </>
    );
}

export default CalculatorApp;