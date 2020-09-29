console.log("# Sandbox Script");

const { currentRecordId, currentTaskTitle } = input.config();

const taskTableId = "tblA0GCA2aDJ0lDwv";
const table = await base.getTable(taskTableId);

// Set end time of record
const endtime = new Date().toISOString();
await table.updateRecordAsync(currentRecordId, {
  ["Actual End Time"]: endtime
});
console.log(
  `Ended task "${currentTaskTitle}"" with actual end time ${endtime}`
);
