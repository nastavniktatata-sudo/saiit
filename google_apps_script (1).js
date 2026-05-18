// ================================================
// Google Apps Script для приёма заявок с сайта
// Глеб Максюта — портфолио
// ================================================
//
// ИНСТРУКЦИЯ ПО УСТАНОВКЕ:
// 1. Откройте Google Таблицу: https://docs.google.com/spreadsheets/d/1umTDAsxypfB3aR-jovCyhc92seXpbNBU2wSbUULV4pc
// 2. В меню выберите: Расширения → Apps Script
// 3. Вставьте весь код ниже (замените всё, что там есть)
// 4. Нажмите «Сохранить» (Ctrl+S)
// 5. Нажмите «Развернуть» → «Новое развёртывание»
// 6. Тип: Веб-приложение
// 7. Выполнять от имени: Я (вашего аккаунта)
// 8. Доступ: Все (Anyone)
// 9. Нажмите «Развернуть» → скопируйте полученный URL
// 10. Вставьте этот URL в файл сайта (см. строку APPS_SCRIPT_URL ниже)
// ================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById('1umTDAsxypfB3aR-jovCyhc92seXpbNBU2wSbUULV4pc');
    var sheet = ss.getActiveSheet();
    
    // Добавляем заголовки если таблица пустая
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата', 'Имя', 'Telegram', 'Телефон', 'Запрос']);
      var headerRow = sheet.getRange(1, 1, 1, 5);
      headerRow.setFontWeight('bold');
      headerRow.setBackground('#C8102E');
      headerRow.setFontColor('#ffffff');
    }
    
    var params = e.parameter;
    var timestamp = params.timestamp || new Date().toLocaleString('ru-RU');
    var name = params.name || '';
    var telegram = params.telegram || '';
    var phone = params.phone || '';
    var request = params.request || '';
    
    sheet.appendRow([timestamp, name, telegram, phone, request]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Данные сохранены' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Script is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
