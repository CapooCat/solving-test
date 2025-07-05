/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

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

//Missing blockchain property
interface WalletBalance {
  currency: string;
  amount: number;
}

//Should be extended from WalletBalance to avoid redundancy
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Redundance interface extend, use BoxProps directly if not adding any new properties
interface Props extends BoxProps {}

const WalletPageProblem: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Should not be using any, which is not type-safe. instead use a specific type for the blockchain property.
  const getPriority = (blockchain: any): number => {
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

  //Should be separating the logic of filtering and sorting for better readability
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // lhsPriority is not defined, should be balancePriority
        if (lhsPriority > -99) {
          // Not sure about this logic, it seems to be checking if the balance is zero or negative
          // but since there isn't any clear rules on how it should be, I'll keep it as is
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Missing return 0 case when priorities are equal
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
    //prices is not used in this function, should be removed from dependencies to avoid unnecessary re-calculations
  }, [balances, prices]);

  //should be inside useMemo with filter and sort to avoid recalculating on every render
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // this should be a separate component
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  //rows did not pass in any props, should be using formattedBalances
  return <div {...rest}>{rows}</div>;
};

export default WalletPageProblem;
