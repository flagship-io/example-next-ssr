// pages/index.jsx

// Importing required modules from the Flagship React SDK
import {
  useFsFlag,
  useFlagship,
  HitType,
  EventCategory,
} from "@flagship.io/react-sdk";
import styles from "../styles/Home.module.css";
import { startFlagshipSDKAsync } from "../startFlagshipSDK"; // Importing startFlagshipSDKAsync function

// Home page component
export default function Home() {
  // Get the Flagship instance
  const fs = useFlagship();

  // Get the value of the 'my_flag_key' flag
  const myFlag = useFsFlag("my_flag_key", "default-value");

  // Function to send a hit to Flagship
  const onSendHitClick = () => {
    fs.hit.send({
      type: HitType.EVENT,
      category: EventCategory.ACTION_TRACKING,
      action: "click button",
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Next ServerSide Rendering Integration With Flagship [SSR]</h1>
        <p>flag key: my_flag_key</p>
        <p>flag value: {myFlag.getValue()}</p>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => {
            onSendHitClick();
          }}
        >
          Send hits
        </button>
      </main>
    </div>
  );
}

// This function runs only on the server side
export async function getServerSideProps(context) {
  const { res, req } = context;

  // Get the visitor ID from the 'fs_visitorID_cookie' cookie if it exists
  const fs_visitorID_cookie = req.cookies["fs_visitorID_cookie"];

  // Define initial visitor data
  const initialVisitorData = {
    id: fs_visitorID_cookie, // If the cookie does not exist, the SDK will generate a new visitor ID
    context: {
      any: "value",
    },
  };

  // start the SDK et get the Flagship instance
  const flagship = await startFlagshipSDKAsync();

  // Create a new visitor using the initial visitor data
  const visitor = flagship.newVisitor({
    visitorId: initialVisitorData.id,
    context: initialVisitorData.context,
  });

  // Fetch flags for the visitor
  await visitor.fetchFlags();

  // Set the 'fs_visitorID_cookie' cookie with the visitor ID
  res.setHeader("Set-Cookie", `fs_visitorID_cookie=${visitor.visitorId}`);

  // Pass data to the page via props
  return {
    props: {
      initialFlagsData: visitor.getFlagsDataArray(),
      initialVisitorData: {
        ...initialVisitorData,
        id: visitor.visitorId,
      },
    },
  };
}
