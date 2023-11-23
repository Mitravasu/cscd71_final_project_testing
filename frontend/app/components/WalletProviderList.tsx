"use client";
import { useState, useEffect } from "react";
import { Eip1193Provider, ethers } from "ethers";

interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: Eip1193Provider;
}

interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: "eip6963:announceProvider";
  detail: EIP6963ProviderDetail;
}

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": EIP6963AnnounceProviderEvent;
  }
}

export default function WalletProviderList() {
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>();
  useEffect(() => {
    console.log("Adding wallet provider announce listener...");
    window.addEventListener(
      "eip6963:announceProvider",
      (event: EIP6963AnnounceProviderEvent) => {
        console.log("Received provider announce event");
        setProviders((prevProviders) => [
          ...(prevProviders ? prevProviders : []),
          event.detail,
        ]);
      }
    );

    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }, []);

  function createProviderCard() {
    return providers?.map((provider, index) => {
      return (
        <div
          key={index}
          className="flex flex-col items-center justify-between p-6"
        >
          <div className="flex flex-col font-mono text-sm bg-slate-800 p-4 rounded-lg">
            <img src={provider.info.icon} />
            <h1>{provider.info.name}</h1>
          </div>
        </div>
      );
    });
  }

  return (
    <main>
      <div className="flex flex-col items-center font-mono text-sm lg:flex">
        <h1>Available Wallets</h1>
        {createProviderCard()}
      </div>
    </main>
  );
}
