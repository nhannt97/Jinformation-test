// this codes call downloadSimulator, and calculate download speed.
// The goal is, ignore first 2 seconds and last 2 seconds, then calculate Download speed.
// For example, if it takes 28 seconds to download, calculate download speed from 3rd second to 26th second.
let downloadedAmount = 0;
const startTime = Date.now();
// status: 'data' - when data arrived. 'done' - when it finishes
let downloadInfo = [];
let prevEnd = startTime;
downloadSimulator((status, receivedPacketByteSize) => {
  const now = Date.now();
  downloadInfo.push({
    startTime: prevEnd,
    endTime: now,
    size: receivedPacketByteSize,
  });
  prevEnd = now;
  downloadedAmount += receivedPacketByteSize;
  console.log(
    `status: ${status}, PacketSize: ${(receivedPacketByteSize / 1000).toFixed(
      2
    )} kB, Downloaded: ${(downloadedAmount / 1000).toFixed(2)} kB`
  );
  if (status === "done") {
    downloadInfo = downloadInfo.filter(item => item.startTime - startTime >= 2000 && downloadInfo[downloadInfo.length - 1].endTime - item.endTime >= 2000)
    if (!downloadInfo.length) {
      console.log(`Total time run less than 4s`)
      return;
    }
    downloadedAmount = downloadInfo.map(item => item.size).reduce((total, item) => total + item) 
    const speed = downloadedAmount / (
      (downloadInfo[downloadInfo.length - 1].endTime - downloadInfo[0].startTime) / 1000
      );
    console.log(`Download Speed : ${(speed / 1000).toFixed(2)} kB/s`);
  }
});

// Do not change below! >>>
function downloadSimulator(cb) {
  return new Promise(async (resolve) => {
    const totalAmount = 10 * 1000 * 1000; // 50 MB
    let downloadedAmount = 0; //
    let status = "data";
    while (downloadedAmount < totalAmount) {
      const timeOut = Math.random() * 600; // I increased timeOut to total time greater than 4s
      await wait(timeOut);
      let packetSize = Math.random() * 1000 * 1000;
      if (packetSize + downloadedAmount >= totalAmount) {
        packetSize = totalAmount - downloadedAmount;
        status = "done";
      }
      cb(status, packetSize);
      // console.log(`PacketSize: ${ (packetSize/1024).toFixed(2)}, Downloaded: ${ (downloadedAmount/1024).toFixed(2)}`)
      downloadedAmount += packetSize;
    }
    resolve();
  });
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
