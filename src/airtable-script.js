output.markdown("# Clockify");
output.markdown("## Start Timer from Task");

// Copy & Paste latest clockify json here
// by inspecting networks tab at https://clockify.me/workspaces/5f70eca68ecf85798d53ba39/settings#tags
const clockifyTags = [
  {
    id: "5f70f216956dd5176b662066",
    name: "customer-caution",
    workspaceId: "5f70eca68ecf85798d53ba39",
    archived: false
  },
  {
    id: "5f70efa3956dd5176b661d2f",
    name: "hello",
    workspaceId: "5f70eca68ecf85798d53ba39",
    archived: false
  },
  {
    id: "5f70efbd8ecf85798d53bdbb",
    name: "accounting-finance",
    workspaceId: "5f70eca68ecf85798d53ba39",
    archived: false
  }
];

// Get current airtable record
const taskTableId = "___________";
const table = await base.getTable(taskTableId);
const currentRecord = await input.recordAsync("Start timer on task...", table);

// Get title of record
let taskTitleField = await table.getField("Title");
const taskTitle = await currentRecord.getCellValue(taskTitleField.id);
console.log(`Task Title: ${taskTitle}`);

// Get Clockify Project ID from record
let clockifyProjectField = await table.getField("Clockify Project ID");
const clockifyProjectList = await currentRecord.getCellValue(
  clockifyProjectField.id
);
const clockifyProjectId = clockifyProjectList
  ? clockifyProjectList[0]
  : clockifyProjectList;
console.log(`clockifyProjectId: ${clockifyProjectId}`);

// Get Airtable Tags from record and match against hardcoded Clockify Tags
let airtableTagsField = await table.getField("Tags");
const airtableTagsList = await currentRecord.getCellValue(airtableTagsField.id);
console.log(`airtableTagsList: ${airtableTagsList}`);
console.log(airtableTagsList);
const matchingClockifyTagIds = [];
for (let i = 0; i < airtableTagsList.length; i++) {
  let matchingClockifyTagId = null;
  clockifyTags.forEach((ct) => {
    if (ct.name === airtableTagsList[i].name) {
      matchingClockifyTagId = ct.id;
    }
  });
  if (matchingClockifyTagId) {
    matchingClockifyTagIds.push(matchingClockifyTagId);
  }
}

const payload = {
  start: new Date().toISOString(),
  billable: "false",
  description: taskTitle,
  projectId: clockifyProjectId,
  tagIds: matchingClockifyTagIds,
  customFields: []
};

const workspaceId = "___________";
const api_key = "___________";
const base_url = `https://api.clockify.me/api/v1/`;
const api_path = `workspaces/${workspaceId}/time-entries`;
const url = `${base_url}${api_path}`;
const response = await fetch(url, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": api_key
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(payload) // body data type must match "Content-Type" header
});
const jsonTest = await response.json();
output.inspect(jsonTest);
