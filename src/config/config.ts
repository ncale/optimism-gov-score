// export environment variables
export const WC_PROJECT_ID = process.env.WC_PROJECT_ID || "PROJECT_ID";
export const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL || "";
export const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "";
export const PONDER_API_URL = process.env.PONDER_API_URL || "";

// configure global variables
export const OP_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000042";
export const OP_VOTING_ADDRESS = "0xcDF27F107725988f2261Ce2256bDfCdE8B382B10";
export const QUALIFYING_PROPOSAL_IDS = [
  BigInt(
    "47253113366919812831791422571513347073374828501432502648295761953879525315523"
  ),
  BigInt(
    "95119698597711750186734377984697814101707190887694311194110013874163880701970"
  ),
  BigInt(
    "110376471005925230990107796624328147348746431603727026291575353089698990280147"
  ),
  BigInt(
    "87887380345359316303511900248014470638082162026872636188610669661624292635896"
  ),
  BigInt(
    "28717615714293937494900642239604511349625947114847340322672351149517127794996"
  ),
  BigInt(
    "73015178396219273083926854824941753345309809188523598109189308270327699475780"
  ),
  BigInt(
    "98465291872542951214209322719211107762519739238690458061430483715486199997958"
  ),
  BigInt(
    "10572947036210533292634221606922807092762967787561796032397523909369599512554"
  ),
  BigInt(
    "64861580915106728278960188313654044018229192803489945934331754023009986585740"
  ),
  BigInt(
    "20327152654308054166942093105443920402082671769027198649343468266910325783863"
  ),
];
