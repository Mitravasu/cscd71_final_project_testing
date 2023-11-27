import WalletProviderList from "./components/WalletProviderList";

import Connector from "./components/Connector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
      <Connector />
      <WalletProviderList />
    </main>
  );
}
