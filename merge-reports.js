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
let report = merge.all(reports);
report.suites.suites = [merge.all(report.suites.suites)];
fs.writeFileSync('all.json', JSON.stringify(report, null, 2));