# Starknet DAI Keeper

## Config
* `FLUSH_DELAY` - minimum time in milliseconds between flushes
* `FLUSH_DELAY_MULTIPLIER` - number of `FLUSH_DELAY`'s to look back for flush l2->l1 messages
* `FLUSH_MINIMUM` - minimum amount of debt required to flush
* `TARGET_DOMAINS` - comma separated strings determining the target domains to flush


## Functions

Both functions only require output of `getConfig`
* `flush` - checks the amount of debt on each domain and calls sends `flush` tx to l2 if above `FLUSH_MINIMUM`
* `finalizeFlush` - checks for l2->l1 `flush` messages and sends `finalizeFlush` tx to l1


## Running
`yarn keeper` will call the `flush` function and then the `finalizeFlush` function
