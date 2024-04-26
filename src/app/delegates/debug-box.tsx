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
          <pre>
            all votes:{" "}
            {JSON.stringify(delegate?.metadata__vote_list_1, null, 2)}
          </pre>
          <pre>
            proposals:{" "}
            {JSON.stringify(delegate?.metadata__vote_list_2, null, 2)}
          </pre>
          <pre>
            votes: {JSON.stringify(delegate?.metadata__vote_list_3, null, 2)}
          </pre>
          <pre>
            non-duplicated votes:{" "}
            {JSON.stringify(delegate?.metadata__vote_list_4, null, 2)}
          </pre>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
