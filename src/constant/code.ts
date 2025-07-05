export const CODE = {
  PROBLEM_1: `  // Function to calculate sum from 1 to n using a for loop
  const sum_to_n_a = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  // Recursive function to calculate sum from 1 to n
  const sum_to_n_b = (n: number): number => {
    if (n < 1) return n;
    return n + sum_to_n_b(n - 1);
  };

  // Function to calculate sum from 1 to n using the formula
  const sum_to_n_c = (n: number): number => {
    return (n * (n + 1)) / 2;
  };
;`,

  PROBLEM_3: `//Missing blockchain property
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
};`,

  SOLVE_3: `interface WalletBalance {
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
};`,
};
