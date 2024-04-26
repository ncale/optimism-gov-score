"use client";

import { Button } from "@/components/ui/button";
import { DelegateTableRow } from "./columns";
import { useState } from "react";

export default function DebugBox({
  data,
}: {
  data: DelegateTableRow[] | undefined;
}) {
  const [showDebug, setShowDebug] = useState(false);

  const delegate = data?.find(
    (delegate) => delegate.metadata__ens_name === "coinruay.eth",
  );

  return (
    <div className="pl-2 text-sm">
      <div className="flex justify-center">
        <Button onClick={() => setShowDebug(!showDebug)} className="w-fit">
          Toggle Debug
        </Button>
      </div>
      {showDebug ? (
        <>
          <pre>{JSON.stringify(delegate?.testing__data, null, 2)}</pre>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
