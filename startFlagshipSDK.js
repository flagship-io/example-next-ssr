// Importing required modules from the Flagship React SDK
const { DecisionMode, Flagship, FSSdkStatus } = require("@flagship.io/react-sdk");

// Function to start the Flagship SDK
async function startFlagshipSDKAsync() {
    // Check if the Flagship SDK has already been initialized
    if (Flagship.getStatus() && Flagship.getStatus() !== FSSdkStatus.SDK_NOT_INITIALIZED) {
        return Flagship; // If it has been initialized, return early
    }
    // Start the Flagship SDK with the provided environment ID and API key
    return await Flagship.start(process.env.NEXT_PUBLIC_ENV_ID, process.env.NEXT_PUBLIC_API_KEY, {
        fetchNow: false, // Do not fetch flags immediately
        decisionMode: DecisionMode.BUCKETING // set decision mode : DECISION_API or BUCKETING
    });
}


// Export the startFlagshipSDK function
module.exports = { startFlagshipSDKAsync };