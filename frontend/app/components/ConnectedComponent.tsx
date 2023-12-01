"use client";
import Image from "next/image";
import { useState } from "react";

export default function ConnectedComponent({
  provider,
}: {
  provider: EIP6963ProviderDetail;
}) {
  const [address, setAddress] = useState<string>("");

  function send() {
    console.log("Sending ETH to", address);
    console.log(provider);
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex bg-slate-800 rounded-lg p-2">
        <Image src={provider.info.icon} width={36} height={36} alt="" />
        <div className="p-3 text-white">
          <h1>{provider.info.name}</h1>
          <h2>{provider.info.uuid}</h2>
          <h3>{provider.info.rdns}</h3>
        </div>
      </div>
    </div>
  );
}
