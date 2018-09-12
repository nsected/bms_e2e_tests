const glob = require("glob");
const merge = require('deepmerge');
const fs = require('fs');

let reports = [];
let reportFiles = glob.sync("report/*.json", {});
console.log(reportFiles);
reportFiles.forEach(reportFile=>{
    let file = fs.readFileSync(reportFile, 'utf8');
    file = JSON.parse(file);
    file.suites.suites[0].tests[0].timedOut = false;
    reports.push(file)
});
let mergedReport = merge.all(reports);
let reportTemplate = {
    "stats": {
        "suites": 0,
        "tests": 0,
        "passes": 0,
        "pending": 0,
        "failures": 0,
        "start": reports[0].stats.start,
        "end": reports[reports.length-1].stats.end,
        "duration": 0,
        "testsRegistered": 0,
        "passPercent": 0,
        "pendingPercent": 0,
        "other": 0,
        "hasOther": false,
        "skipped": 0,
        "hasSkipped": false,
        "passPercentClass": "success",
        "pendingPercentClass": "success"
    },
    "suites": mergedReport.suites,
    "copyrightYear": mergedReport.copyrightYear
};

reports.forEach(reportObject=>{
    // console.log(reportObject);
    reportTemplate.stats.suites += reportObject.stats.suites;
    reportTemplate.stats.tests += reportObject.stats.tests;
    reportTemplate.stats.passes += reportObject.stats.passes;
    reportTemplate.stats.pending += reportObject.stats.pending;
    reportTemplate.stats.failures += reportObject.stats.failures;
    reportTemplate.stats.testsRegistered += reportObject.stats.testsRegistered;
    reportTemplate.stats.passPercentClass = reportObject.stats.passPercentClass === "danger" ? "danger" : reportTemplate.stats.passPercentClass;
    reportTemplate.stats.pendingPercentClass = reportObject.stats.pendingPercentClass === "danger" ? "danger" : reportTemplate.stats.pendingPercentClass;
    reportTemplate.stats.duration += reportObject.stats.duration;
});
reportTemplate.stats.failures = reportTemplate.stats.testsRegistered - reportTemplate.stats.passes;
reportTemplate.stats.passPercent = Math.round((reportTemplate.stats.passes / reportTemplate.stats.testsRegistered) * 100);

// report.suites.suites = [merge.all(report.suites.suites)];
fs.writeFileSync('report/all.json', JSON.stringify(reportTemplate, null, 2));