"use client";
import { useState } from "react";
import WalletProviderList from "./components/WalletProviderList";

import Connector from "./components/Connector";
import ConnectedComponent from "./components/ConnectedComponent";

export default function Home() {
  const [provider, setProvider] = useState<EIP6963ProviderDetail>();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Connector /> */}
      {provider ? (
        <ConnectedComponent provider={provider} />
      ) : (
        <WalletProviderList setProvider={setProvider} />
      )}
    </main>
  );
}
