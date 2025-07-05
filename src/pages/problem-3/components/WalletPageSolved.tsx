import { useMemo } from "react";
import WalletRow from "./WalletRow";

const useWalletBalances = (): WalletBalance[] => {
  // Mock implementation of useWalletBalances
  return [
    { currency: "ATOM", amount: 100, blockchain: "Osmosis" },
    { currency: "ETH", amount: 0, blockchain: "Ethereum" },
    { currency: "ARB", amount: 50, blockchain: "Arbitrum" },
    { currency: "ZIL", amount: 0, blockchain: "Zilliqa" },
    { currency: "NEO", amount: 20, blockchain: "Neo" },
  ];
};

const usePrices = (): Record<string, number> => {
  // Mock implementation of usePrices
  return {
    ATOM: 10,
    ETH: 2000,
    ARB: 1.5,
    ZIL: 0.1,
    NEO: 50,
  };
};

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const Rows = ({ balances }: { balances: FormattedWalletBalance[] }) => {
  const prices = usePrices();

  return balances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className="mock-class"
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });
};

const WalletPageSolved: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  const balances = useWalletBalances();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const getWalletWithZeroBalances = (balances: WalletBalance[]) => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount <= 0;
    });
  };

  const sortBalances = (balances: WalletBalance[]) => {
    return balances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) return -1;
      if (leftPriority < rightPriority) return 1;
      return 0;
    });
  };

  const reformatBalances = (balances: WalletBalance[]): FormattedWalletBalance[] => {
    return balances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  };

  const sortedBalances = useMemo((): FormattedWalletBalance[] => {
    let _balances = balances;
    _balances = getWalletWithZeroBalances(_balances);
    _balances = sortBalances(_balances);
    return reformatBalances(_balances);
  }, [balances]);

  return (
    <div {...rest}>
      {children}
      <Rows balances={sortedBalances} />
    </div>
  );
};

export default WalletPageSolved;
