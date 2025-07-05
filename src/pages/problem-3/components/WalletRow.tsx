interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
  return (
    <div className={`wallet-row ${className || ""}`}>
      <div className="wallet-row__amount">
        <span className="amount-value">{formattedAmount}</span>
        <span className="amount-raw">({amount})</span>
      </div>
      <div className="wallet-row__usd-value">
        <span className="usd-symbol">$</span>
        <span className="usd-amount">{usdValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default WalletRow;
