import reportTracker from "../../utils/reportTracker";
export default function FPTracker(FCP?: boolean) {
    const entryHandler = (list: any) => {
        for (const entry of list.getEntries()) {
            if (entry.name === "first-paint") {
                observer.disconnect();
                console.log("FPtime", entry.startTime);
                let reportData = {
                    name: "FP",
                    FPtime: entry.startTime,
                };
                reportTracker(reportData);
            }
            if (FCP===true) {
                if (entry.name === "first-contentful-paint") {
                    observer.disconnect();
                    console.log("FCPtime", entry.startTime);
                    let reportData = {
                        name: "FCP",
                        FCPtime: entry.startTime,
                    };
                    reportTracker(reportData);
                }
            }
        }
    };
    const observer = new PerformanceObserver(entryHandler);
    observer.observe({ type: "paint", buffered: true });
}
