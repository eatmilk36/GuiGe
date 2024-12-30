@echo off
REM 設置字符集為 UTF-8
chcp 65001 >nul

REM 進入 backend 資料夾
cd .\backend\

REM 設定忽略錯誤的選項
setlocal enabledelayedexpansion

REM 執行每個 migration，忽略錯誤
call :runMigration 20241126081937_create_user.ts
call :runMigration 20241130180212_create_supplier_table.ts
call :runMigration 20241217135833_create_dailySalesType.ts
call :runMigration 20241212233333_create_dailySales.ts
call :runMigration 20241216151933_create_product.ts
call :runMigration 20241219124433_create_staff.ts
call :runMigration 20241219140133_create_staffWork.ts

REM 執行 Seed
echo Running seed: init_users.ts
npx knex seed:run --specific=init_users.ts || echo Seed init_users.ts failed. Continuing...

REM 顯示完成訊息
echo All migrations and seed completed (errors ignored).
pause
exit /b

:runMigration
REM 執行 migration，忽略錯誤
npx knex migrate:up %1 || echo Migration %1 failed. Continuing...
exit /b 0
