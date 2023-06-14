// Importing required modules from the Flagship React SDK
const { DecisionMode, Flagship, FlagshipStatus } = require("@flagship.io/react-sdk");

// Function to start the Flagship SDK
function startFlagshipSDK() {
    // Check if the Flagship SDK has already been initialized
    if (Flagship.getStatus() && Flagship.getStatus() !== FlagshipStatus.NOT_INITIALIZED) {
        return; // If it has been initialized, return early
    }
    // Start the Flagship SDK with the provided environment ID and API key
    Flagship.start(process.env.NEXT_PUBLIC_ENV_ID, process.env.NEXT_PUBLIC_API_KEY, {
        fetchNow: false, // Do not fetch flags immediately
        decisionMode: DecisionMode.BUCKETING // set decision mode : DECISION_API or BUCKETING
    });
}

// Export the startFlagshipSDK function
module.exports = startFlagshipSDK;