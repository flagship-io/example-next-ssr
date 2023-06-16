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
        decisionMode: DecisionMode.DECISION_API // set decision mode : DECISION_API or BUCKETING
    });
}

// Function to start the Flagship SDK
function startFlagshipSDKAsync() {
    // Return a new Promise
    return new Promise((resolve) => {
        // Check if the Flagship SDK has already been initialized
        if (
            Flagship.getStatus() &&
            Flagship.getStatus() !== FlagshipStatus.NOT_INITIALIZED
        ) {
            // If it has been initialized, resolve the Promise with the Flagship object and return early
            resolve(Flagship);
            return;
        }
        // If the SDK has not been initialized, start it with the specified parameters
        Flagship.start(
            process.env.NEXT_PUBLIC_ENV_ID, // Environment ID
            process.env.NEXT_PUBLIC_API_KEY, // API key
            {
                pollingInterval: 20, // Set polling interval to 20
                fetchNow: false, // Do not fetch flags immediately
                decisionMode: DecisionMode.BUCKETING, // Set decision mode to BUCKETING
                onBucketingSuccess: () => {
                    // On successful bucketing, resolve the Promise with the Flagship object
                    resolve(Flagship);
                },
                onBucketingFail() {
                    // On failed bucketing, resolve the Promise with the Flagship object
                    resolve(Flagship);
                },
            }
        );
    });
}

// Export the startFlagshipSDK function
module.exports = { startFlagshipSDK, startFlagshipSDKAsync };