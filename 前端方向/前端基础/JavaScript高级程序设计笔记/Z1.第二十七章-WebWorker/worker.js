let a = 0;

self.onmessage = function (e) {
  console.log("onMsg", e);
  run();
};

function run() {
  const now = Date.now() + 5000;
  while (Date.now() < now) {
    a += 1;
  }
  self.postMessage("done");
}
