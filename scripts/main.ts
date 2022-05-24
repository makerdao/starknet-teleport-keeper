import { getConfig } from "./utils";
import { finalizeFlush, flush } from "./keeper";

(async () => {
  await flush(getConfig(), process.argv[3]);
  await finalizeFlush(getConfig());
})()
  .then(() => console.log("DONE"))
  .catch((e) => {
    console.error("Error occured: ", e);
    process.exit(1);
  });
