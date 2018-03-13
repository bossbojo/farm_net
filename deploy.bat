rmdir /s /q \\45.76.156.247\farmnet\Frontend
mkdir \\45.76.156.247\farmnet\Frontend
xcopy /e /i /v /h /k /y dist \\45.76.156.247\farmnet\Frontend 
rmdir /s /q dist