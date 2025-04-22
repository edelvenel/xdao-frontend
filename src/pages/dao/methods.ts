export function mapTabNumber(tab: string | undefined): number {
  switch (tab) {
    case "overview": {
      return 0;
    }
    case "votes": {
      return 1;
    }
    case "crowdfunding": {
      return 2;
    }
    case "dao-balance": {
      return 3;
    }
    case "settings": {
      return 4;
    }
    default:
      return 0;
  }
}

export function mapNumberTab(tabIdx: number): string {
  switch (tabIdx) {
    case 0: {
      return "overview";
    }
    case 1: {
      return "votes";
    }
    case 2: {
      return "crowdfunding";
    }
    case 3: {
      return "dao-balance";
    }
    case 4: {
      return "settings";
    }
    default:
      return "overview";
  }
}
