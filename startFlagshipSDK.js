const { DecisionMode, Flagship, FlagshipStatus } = require("@flagship.io/react-sdk")


function startFlagshipSDK() {
    if (Flagship.getStatus() && Flagship.getStatus() !== FlagshipStatus.NOT_INITIALIZED) {
        return
    }
    Flagship.start(process.env.NEXT_PUBLIC_ENV_ID, process.env.NEXT_PUBLIC_API_KEY, {
        fetchNow: false,
        decisionMode: DecisionMode.BUCKETING
    });
}

module.exports = startFlagshipSDK