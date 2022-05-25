import { finalizeFlush, flush } from "./keeper";
import { getConfig } from "./utils";

(async () => {
  await flush(getConfig());
  await finalizeFlush(getConfig());
})()
  .then(() => console.log("DONE"))
  .catch((e) => {
    console.error("Error occured: ", e);
    process.exit(1);
  });
