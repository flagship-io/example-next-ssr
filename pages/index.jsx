//pages/index.jsx

import {
  useFsFlag,
  useFlagship,
  Flagship,
  HitType,
  EventCategory,
} from "@flagship.io/react-sdk";
import styles from "../styles/Home.module.css";

export default function Home() {
  const fs = useFlagship();

  //get flag
  const myFlag = useFsFlag("my_flag_key", "default-value");

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

  //Start the Flagship SDK
  // const flagship = Flagship.start(
  //   process.env.NEXT_PUBLIC_ENV_ID,
  //   process.env.NEXT_PUBLIC_API_KEY,
  //   {
  //     fetchNow: false,
  //   }
  // );

  //Get visitorId from cookies if exists
  const fs_visitorID_cookie = req.cookies["fs_visitorID_cookie"];

  const initialVisitorData = {
    id: fs_visitorID_cookie, // if not exists the SDK will generate one
    context: {
      any: "value",
    },
  };

  // Create a new visitor
  const visitor = Flagship.newVisitor({
    visitorId: initialVisitorData.id,
    context: initialVisitorData.context,
  });

  // //Fetch flags
  await visitor.fetchFlags();

  //set cookie fs_visitorID_cookie
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
