import { useState } from 'react';
import { ArrowDownUp, DollarSign, Ruler } from 'lucide-react';

type ConversionMode = 'currency' | 'hectares' | 'sqmeters';

interface ConversionConfig {
  title: string;
  subtitle: string;
  fromUnit: string;
  fromLabel: string;
  toUnit: string;
  toLabel: string;
  rate: number;
  rateText: string;
  decimals: number;
}

export default function App() {
  const [inputAmount, setInputAmount] = useState('');
  const [mode, setMode] = useState<ConversionMode>('currency');
  const [isReversed, setIsReversed] = useState(false);

  const configs: Record<ConversionMode, ConversionConfig> = {
    currency: {
      title: 'Currency Converter',
      subtitle: 'PHP to USD',
      fromUnit: 'PHP',
      fromLabel: 'Philippine Peso',
      toUnit: 'USD',
      toLabel: 'US Dollar',
      rate: 0.018,
      rateText: '1 PHP = 0.018 USD',
      decimals: 2,
    },
    hectares: {
      title: 'Land Area Converter',
      subtitle: 'Hectares to Acres',
      fromUnit: 'ha',
      fromLabel: 'Hectares',
      toUnit: 'ac',
      toLabel: 'Acres',
      rate: 2.47105,
      rateText: '1 ha = 2.47105 ac',
      decimals: 4,
    },
    sqmeters: {
      title: 'Land Area Converter',
      subtitle: 'Square Meters to Square Feet',
      fromUnit: 'm²',
      fromLabel: 'Square Meters',
      toUnit: 'ft²',
      toLabel: 'Square Feet',
      rate: 10.7639,
      rateText: '1 m² = 10.7639 ft²',
      decimals: 2,
    },
  };

  const config = configs[mode];
  
  // Determine which direction we're converting
  const fromUnit = isReversed ? config.toUnit : config.fromUnit;
  const fromLabel = isReversed ? config.toLabel : config.fromLabel;
  const toUnit = isReversed ? config.fromUnit : config.toUnit;
  const toLabel = isReversed ? config.fromLabel : config.fromLabel;
  const rate = isReversed ? (1 / config.rate) : config.rate;
  const rateText = isReversed 
    ? `1 ${config.toUnit} = ${(1 / config.rate).toFixed(config.decimals === 2 ? 2 : 4)} ${config.fromUnit}`
    : config.rateText;
  
  const outputAmount = inputAmount 
    ? (parseFloat(inputAmount) * rate).toFixed(config.decimals) 
    : '0.00';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };

  const clearAmount = () => {
    setInputAmount('');
  };

  const switchMode = (newMode: ConversionMode) => {
    setMode(newMode);
    setInputAmount('');
    setIsReversed(false);
  };

  const swapUnits = () => {
    setIsReversed(!isReversed);
    setInputAmount('');
  };

  return (
    <div className="size-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{config.title}</h1>
          <p className="text-gray-600">{config.subtitle}</p>
        </div>

        {/* Converter Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Input */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="text-white text-sm font-medium mb-2 opacity-90">From</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-2xl font-semibold">{fromUnit}</span>
              <span className="text-white text-sm opacity-75">{fromLabel}</span>
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={inputAmount}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full bg-white/20 backdrop-blur-sm text-white text-4xl font-light border-none outline-none rounded-2xl px-4 py-3 placeholder-white/50"
            />
          </div>

          {/* Divider with Icon */}
          <div className="relative h-12 bg-gray-50">
            <button 
              onClick={swapUnits}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg border-4 border-gray-50 hover:bg-gray-50 active:scale-95 transition-transform cursor-pointer"
            >
              <ArrowDownUp className="w-5 h-5 text-indigo-600" />
            </button>
          </div>

          {/* Output */}
          <div className="p-6 bg-gray-50">
            <div className="text-gray-600 text-sm font-medium mb-2">To</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900 text-2xl font-semibold">{toUnit}</span>
              <span className="text-gray-500 text-sm">{toLabel}</span>
            </div>
            <div className="w-full bg-white text-gray-900 text-4xl font-light rounded-2xl px-4 py-3 border-2 border-gray-200">
              {outputAmount}
            </div>
          </div>

          {/* Rate Info */}
          <div className="px-6 py-4 bg-white border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="text-gray-900 font-medium">{rateText}</span>
            </div>
          </div>

          {/* Clear Button */}
          <div className="p-6 pt-2">
            <button
              onClick={clearAmount}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-lg active:scale-98 transition-transform"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => switchMode('currency')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              mode === 'currency'
                ? 'bg-white text-indigo-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Currency</span>
          </button>
          <button
            onClick={() => switchMode('hectares')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              mode === 'hectares'
                ? 'bg-white text-indigo-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span className="text-sm">ha / ac</span>
          </button>
          <button
            onClick={() => switchMode('sqmeters')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              mode === 'sqmeters'
                ? 'bg-white text-indigo-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span className="text-sm">m² / ft²</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>{mode === 'currency' ? 'Exchange rates are approximate and for reference only' : 'Conversion rates are standard values'}</p>
        </div>
      </div>
    </div>
  );
}