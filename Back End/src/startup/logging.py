# structure, date/time, log type, file source, log level
import datetime
import sys
class Logger:
    def __init__(self, file = 'system'):
        self.file = file
        sys.excepthook = self.uncoughtExceptionsCallback
    def uncoughtExceptionsCallback(self, exe_type, exe_value, exe_traceback):
        self.error(exe_value)
        
    def getDate(self):
        now = str(datetime.datetime.now()).split(".")
        return now[0]
    def info(self, log, x='', type='SYS'):
        time = self.getDate()
        level = 'INFO'
        print(f"{time} | {type} | {level} | {self.file} | {log} {': '+x if x else ''}")  

    def error(self, log, x='', type='SYS'):
        time = self.getDate()
        level = 'ERROR'
        print(f"{time} | {type} | {level} | {self.file} | {log} {': '+x if x else ''}") 
    
    def dblog(self, log, x='', type='SYS'):
        time = self.getDate()
        level = 'LOG'
        print(f"{time} | {type} | {level} | {self.file} | {log} {': '+x if x else ''}")        
        
        
    