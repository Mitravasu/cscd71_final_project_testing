
interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP1193Provider {
  request: (payload: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<unknown>;
  on(eventName: string, callback: (...args: any[]) => void): void;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: Eip1193Provider;
}

interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: "eip6963:announceProvider";
  detail: EIP6963ProviderDetail;
}

interface EIP6963RequestProviderEvent extends Event {
  type: "eip6963:requestProvider";
}

interface EVMProviderDetected extends EIP6963ProviderDetail {
  accounts: string[];
  request?: EIP1193Provider["request"];
}