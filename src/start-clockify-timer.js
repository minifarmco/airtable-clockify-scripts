// Clockify + Todoist Integration
// Written by Mini-Farm Co.
// Codesandbox: https://codesandbox.io/s/loving-rain-ji0se
// Github Repo: https://github.com/minifarmco/airtable-clockify-scripts
output.markdown("# Airtask Timer");

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

  // Copy & Paste latest clockify json here
  // by inspecting networks tab at https://clockify.me/workspaces/5f70eca68ecf85798d53ba39/settings#tags
  const clockifyTags = [
    {
      id: "5f722c3f8ecf85798d5cc58c",
      name: "accounting-finance",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c718ecf85798d5cc5e6",
      name: "admin-hr",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cc28ecf85798d5cc682",
      name: "advertising",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cc68ecf85798d5cc689",
      name: "affiliates",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722caf956dd5176b6f1ffb",
      name: "analytics",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c6d956dd5176b6f1f75",
      name: "automation-infotech",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cce956dd5176b6f2054",
      name: "brand-storytelling",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c29956dd5176b6f3eae",
      name: "chargeback",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722d18956dd5176b6f20fc",
      name: "community",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cbb956dd5176b6f2024",
      name: "company-culture",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722d1b8ecf85798d5cc74c",
      name: "customer-frontier",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c32956dd5176b6f3ec2",
      name: "customer-service",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c2e956dd5176b6f3eb9",
      name: "customer-success",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c37956dd5176b6f3ec9",
      name: "customer-support",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c77956dd5176b6f1f8c",
      name: "data-collection",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c918ecf85798d5cc61a",
      name: "executives",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c638ecf85798d5ce680",
      name: "freight-forwarding",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c578ecf85798d5ce668",
      name: "grow-guides",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722ca88ecf85798d5cc64a",
      name: "hiring",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f724d27956dd5176b6f6007",
      name: "inventory-purchasing",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c878ecf85798d5cc60a",
      name: "legal-compliance",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c60956dd5176b6f3f2e",
      name: "nutrients",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cac8ecf85798d5cc655",
      name: "onboarding",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c8d956dd5176b6f1fb7",
      name: "partnerships",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c7d8ecf85798d5cc5f0",
      name: "platform-health",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c668ecf85798d5ce688",
      name: "product-sourcing",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c6c8ecf85798d5ce69b",
      name: "quality-assurance",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c5d956dd5176b6f3f20",
      name: "refunds",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722d2d956dd5176b6f211b",
      name: "reputation-reviews",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cbe8ecf85798d5cc676",
      name: "resiliency",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cb78ecf85798d5cc66f",
      name: "retrospective",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c7a956dd5176b6f3f69",
      name: "revisit",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722d21956dd5176b6f2108",
      name: "sales-promos",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722c80956dd5176b6f1f9f",
      name: "security",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c248ecf85798d5ce5f1",
      name: "social-proof",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722d26956dd5176b6f2112",
      name: "storefront",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f725386956dd5176b6f6ca1",
      name: "sync-sweep",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f722cb3956dd5176b6f2008",
      name: "taxation",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    },
    {
      id: "5f723c76956dd5176b6f3f60",
      name: "warehouse-fulfillment",
      workspaceId: "5f70eca68ecf85798d53ba39",
      archived: false
    }
  ];

  // Get current airtable record
  const taskTableId = "tblA0GCA2aDJ0lDwv";
  const table = await base.getTable(taskTableId);
  const currentRecord = await input.recordAsync(
    "Start timer on task...",
    table
  );

  // Get title of record if there is no pre-existing Clockify Task ID
  let taskTitleField = await table.getField("Title");
  const taskTitle = await currentRecord.getCellValue(taskTitleField.id);

  // Check if Clockify Task ID already exists in Airtable row
  output.markdown(`Checking if a Clockify Task ID already exists...`);
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
  } else {
    output.markdown(`No Clockify ID exists yet.`);
    output.markdown(`
    ###### Creating Clockify task:
    ## ${taskTitle}
    `);
  }

  output.markdown(`
  ###### Starting task:
  ## ${taskTitle}
  Started at GMT: ${new Date().toString()}
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
  output.markdown(`Getting Clockify User Details`);
  const clockifyUser = await getCurrentUserClockifyApiAndUserKey();
  output.markdown(`Successfully Clockify User ID ${clockifyUser.nickname}`);

  output.markdown(`Creating the task creation event payload`);
  const taskPayload = {
    name: `${taskTitle} - by ${clockifyUser.nickname}`,
    projectId: clockifyProjectId,
    assigneeIds: [clockifyUser.clockifyUserKey],
    status: "ACTIVE"
  };
  console.log(taskPayload);
  output.markdown(`${JSON.stringify(taskPayload)}`);
  const workspaceId = "5f70eca68ecf85798d53ba39";
  const clockify_api_key = clockifyUser.clockifyApiKey;
  const base_url = `https://api.clockify.me/api/v1/`;
  const task_api_path = `workspaces/${workspaceId}/projects/${clockifyProjectId}/tasks`;
  const task_url = `${base_url}${task_api_path}`;
  if (!clockifyTaskId) {
    output.markdown(`Creating the task...`);
    const taskResponse = await fetch(task_url, {
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
      body: JSON.stringify(taskPayload) // body data type must match "Content-Type" header
    });
    const jsonResult = await taskResponse.json();
    const generatedClockifyTaskId = jsonResult.id;
    // output.inspect(jsonResult);
    if (!generatedClockifyTaskId) {
      throw new Error(
        `Could not create a generatedClockifyTaskId. Most likely this Clockify User does not have access to this Project ${clockifyProjectId}`
      );
    }
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
  }

  // Get Airtable Tags from record and match against hardcoded Clockify Tags
  let airtableTagsField = await table.getField("Tags");
  const airtableTagsList = await currentRecord.getCellValue(
    airtableTagsField.id
  );
  output.markdown(
    `Tagged with: ${airtableTagsList.map((t) => t.name).join(", ")}`
  );
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
    taskId: clockifyTaskId,
    tagIds: matchingClockifyTagIds,
    customFields: [
      // When we buy the Clockify Enterprise Plan, we can add customField for url linking back to Airtask
    ]
  };

  const api_path = `workspaces/${workspaceId}/time-entries`;
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
  const jsonTest = await response.json();
  // output.inspect(jsonTest);

  // Get actual start time of record
  const actualStartTimeFieldNameInAirtable = "Actual Start Time";
  let taskActualStartTimeField = await table.getField(
    actualStartTimeFieldNameInAirtable
  );
  const actualStartTime = await currentRecord.getCellValue(
    taskActualStartTimeField.id
  );
  // Update the actual start time if none exists
  if (!actualStartTime) {
    // Update the airtable row with the clockifyTaskId
    const startime = new Date().toISOString();
    await table.updateRecordAsync(currentRecord.id, {
      [actualStartTimeFieldNameInAirtable]: startime
    });
    output.markdown(`
✅ Updated Airtable row with actual start time at ${startime}
    `);
  } else {
    output.markdown(`
✅ There is already an actual start time ${actualStartTime}
    `);
  }

  output.markdown(`
  ## ✅ Success! Timer has started.
  `);
} catch (e) {
  console.log(e);
  output.markdown(`
# ❌ Error: Failed to start timer
Message @kangzeroo on Slack to get this investigated and fixed
  `);
}
