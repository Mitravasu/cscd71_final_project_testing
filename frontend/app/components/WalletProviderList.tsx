"use client";
import { useState, useEffect } from "react";
import { Eip1193Provider, ethers } from "ethers";
import Image from "next/image";

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": EIP6963AnnounceProviderEvent;
  }
}

export default function WalletProviderList() {
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>();
  useEffect(() => {
    populateWalletProviders();
  }, []);

  function populateWalletProviders() {
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
  }

  function printProviderInfo() {
    console.log(providers);
  }

  function createProviderCard() {
    return providers?.map((provider, index) => {
      return (
        <div
          key={index}
          className="flex flex-col font-mono text-sm bg-slate-800 p-4 rounded-lg text-center mt-10"
        >
          <Image src={provider.info.icon} width={96} height={96} alt="" />
          <h1 className="text-white p-2">{provider.info.name}</h1>
        </div>
      );
    });
  }

  return (
    <main>
      <div className="flex flex-col items-center font-mono text-sm lg:flex">
        <h1>Available Wallets</h1>
        <button onClick={printProviderInfo}>Print Provider Info</button>
        {createProviderCard()}
      </div>
    </main>
  );
}
