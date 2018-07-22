rmdir /s /q \\207.148.122.173\CriketFarm
mkdir \\207.148.122.173\CriketFarm
xcopy /e /i /v /h /k /y dist \\207.148.122.173\CriketFarm
rmdir /s /q dist