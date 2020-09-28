// Clockify + Todoist Integration
// Written by Mini-Farm Co.
// Codesandbox: https://codesandbox.io/s/loving-rain-ji0se
// Github Repo: https://github.com/minifarmco/airtable-clockify-scripts
output.markdown("# Create Clockify Task");

try {
  const getCurrentUserClockifyApiAndUserKey = async () => {
    const clockifyApiKeyTable = "tblKyuP9jphZ2cjhQ";
    const clockifyApiKeyView = "viwv5WeqgNlEX0qYx";
    const apiTable = await base.getTable(clockifyApiKeyTable);
    const view = apiTable.getView(clockifyApiKeyView);
    const rows = await view.selectRecordsAsync();
    const collaborators = rows.records
      .filter((row) => row)
      .map((row) => {
        return {
          airtableCollaboratorId: row.getCellValue("Airtable Collaborator ID"),
          nickname: row.getCellValue("Nickname"),
          clockifyApiKey: row.getCellValue("Clockify API Key"),
          clockifyUserKey: row.getCellValue("Clockify User ID")
        };
      });
    const myCollaboratorDetails = collaborators.find(
      (c) => c.airtableCollaboratorId === session.currentUser.id
    );
    return myCollaboratorDetails;
  };

  // Get current airtable record
  const taskTableId = "tblA0GCA2aDJ0lDwv";
  const table = await base.getTable(taskTableId);
  const currentRecord = await input.recordAsync(
    "Creating Clockify Task for Shopify Task",
    table
  );

  // Check if Clockify Task ID already exists in Airtable row
  const clockifyFieldNameInAirtable = "Clockify Task ID";
  let clockifyTaskIdField = await table.getField(clockifyFieldNameInAirtable);
  const clockifyTaskId = await currentRecord.getCellValue(
    clockifyTaskIdField.id
  );
  if (clockifyTaskId) {
    output.markdown(`
## Clockify Task ID ${clockifyTaskId} already exists!
There is no need to create a new Task ID. If you insist on creating a new Task ID, please delete the contents of the field in the Airtable row.
This script will now exit.
    `);
    return;
  }
  // Get title of record if there is no pre-existing Clockify Task ID
  let taskTitleField = await table.getField("Title");
  const taskTitle = await currentRecord.getCellValue(taskTitleField.id);
  output.markdown(`
  ###### Creating Clockify task:
  ## ${taskTitle}
  `);

  // Get Clockify Project ID from record
  let clockifyProjectField = await table.getField("Clockify Project ID");
  const clockifyProjectList = await currentRecord.getCellValue(
    clockifyProjectField.id
  );
  const clockifyProjectId = clockifyProjectList
    ? clockifyProjectList[0]
    : clockifyProjectList;

  // Get Clockify User Details
  const clockifyUser = await getCurrentUserClockifyApiAndUserKey();

  const payload = {
    name: taskTitle,
    projectId: clockifyProjectId,
    assigneeIds: [clockifyUser.clockifyUserKey],
    status: "ACTIVE"
  };
  const workspaceId = "5f70eca68ecf85798d53ba39";
  const clockify_api_key = clockifyUser.clockifyApiKey;
  const base_url = `https://api.clockify.me/api/v1/`;
  const api_path = `workspaces/${workspaceId}/projects/${clockifyProjectId}/tasks`;
  const url = `${base_url}${api_path}`;
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": clockify_api_key
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(payload) // body data type must match "Content-Type" header
  });
  const jsonResult = await response.json();
  const generatedClockifyTaskId = jsonResult.id;
  // output.inspect(jsonResult);
  output.markdown(`
  ✅ Created task in Clockify with ID: ${generatedClockifyTaskId}
  `);

  // Update the airtable row with the clockifyTaskId
  await table.updateRecordAsync(currentRecord.id, {
    [clockifyFieldNameInAirtable]: generatedClockifyTaskId
  });
  output.markdown(`
  ✅ Updated Airtable row with Clockify Task ID
  `);

  output.markdown(`
  ## ✅ Success! Clockify Task was created.
  `);
} catch (e) {
  console.log(e);
  output.markdown(`
# ❌ Error: Failed to create Clockify Task
Message @kangzeroo on Slack to get this investigated and fixed
  `);
}
