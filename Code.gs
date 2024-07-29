// Function to create a new task
function createTask(title, description, deadline, assignedTo) {
  if (!title || !deadline) {
    return 'Title and Deadline are required';
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  var lastRow = sheet.getLastRow();
  var newRow = lastRow + 1;
  
  // Generate a unique ID
  var id = newRow;
  var deadlineDate = new Date(deadline);
  
  // Add the new task to the sheet
  sheet.appendRow([id, title, description, deadlineDate, assignedTo, 'Pending']);
  
  // Create a calendar event for the task deadline
  var calendar = CalendarApp.getDefaultCalendar();
  calendar.createEvent(title, deadlineDate, deadlineDate);

  return 'Task created successfully';
}

// Function to get all tasks
function getTasks() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  var data = sheet.getDataRange().getValues();
  
  // Convert to JSON format
  var tasks = [];
  for (var i = 1; i < data.length; i++) {
    tasks.push({
      id: data[i][0],
      title: data[i][1],
      description: data[i][2],
      deadline: data[i][3],
      assignedTo: data[i][4],
      status: data[i][5]
    });
  }
  return tasks;
}

// Function to update a task status
function updateTaskStatus(taskId, status) {
  if (!taskId || !status) {
    return 'Task ID and Status are required';
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == taskId) {
      sheet.getRange(i + 1, 6).setValue(status);
      return 'Task status updated successfully';
    }
  }
  return 'Task not found';
}

// Function to delete a task
function deleteTask(taskId) {
  if (!taskId) {
    return 'Task ID is required';
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == taskId) {
      sheet.deleteRow(i + 1);
      return 'Task deleted successfully';
    }
  }
  return 'Task not found';
}

// Function to get a task by ID
function getTaskById(taskId) {
  if (!taskId) {
    return 'Task ID is required';
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == taskId) {
      return {
        id: data[i][0],
        title: data[i][1],
        description: data[i][2],
        deadline: data[i][3],
        assignedTo: data[i][4],
        status: data[i][5]
      };
    }
  }
  return 'Task not found';
}

// Function to list unique users
function listUsers() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  var data = sheet.getRange('E2:E').getValues();
  var users = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] && users.indexOf(data[i][0]) === -1) {
      users.push(data[i][0]);
    }
  }
  return users;
}
