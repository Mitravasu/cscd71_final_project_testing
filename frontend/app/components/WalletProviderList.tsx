"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": EIP6963AnnounceProviderEvent;
  }
}

export default function WalletProviderList({
  setProvider,
}: {
  setProvider: any;
}) {
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
        console.log(event.detail);
        setProviders((prevProviders) => [
          ...(prevProviders ? prevProviders : []),
          event.detail,
        ]);
      }
    );

    console.log("Requesting wallet providers...");
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }

  function printProviderInfo() {
    console.log(providers);
  }

  function createProviderCard() {
    return providers
      ?.filter((p) => p != null)
      .map((provider, index) => {
        return (
          <div
            key={index}
            className="flex flex-col font-mono text-sm bg-slate-800 p-4 rounded-lg text-center mt-10 items-center"
            onClick={async () => await connectProvider(provider)}
          >
            <Image src={provider.info.icon} width={96} height={96} alt="" />
            <h1 className="text-white p-2">{provider.info.name}</h1>
          </div>
        );
      });
  }

  async function connectProvider(selectedProvider: EIP6963ProviderDetail) {
    console.log("connectProvider");
    console.log(selectedProvider.info);
    console.log(selectedProvider.provider);

    try {
      const accounts = (await selectedProvider.provider.request({
        method: "eth_requestAccounts",
      })) as string[];
      setProviders((prevProviders) => [
        ...(prevProviders ? prevProviders : []),
        {
          ...selectedProvider,
        },
      ]);
      setProvider(selectedProvider);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to connect to provider");
    }
  }

  return (
    <main>
      <div className="flex flex-col items-center font-mono text-sm lg:flex">
        <h1>Available Wallets</h1>
        <button onClick={populateWalletProviders}>Look For Providers</button>
        <button onClick={printProviderInfo}>Print Provider Info</button>
        {createProviderCard()}
      </div>
    </main>
  );
}
