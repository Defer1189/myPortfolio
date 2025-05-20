// myPortfolio/client/src/components/CounterCard.jsx
import React, { useState } from 'react';

/**
 * Componente de tarjeta con un contador simple.
 * @returns {React.JSX.Element} La tarjeta con el contador.
 */
function CounterCard() {
    const [count, setCount] = useState(0);

    return (
        <div className='card'>
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>
                Edit <code>src/App.jsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default CounterCard;
