const getCurrentUserClockifyApiKey = async () => {
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
        clockifyApiKey: row.getCellValue("Clockify API Key")
      };
    });
  const myCollaboratorDetails = collaborators.find(
    (c) => c.airtableCollaboratorId === session.currentUser.id
  );
  return myCollaboratorDetails.clockifyApiKey;
};
