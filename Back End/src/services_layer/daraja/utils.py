from datetime import datetime

def get_formatted_timestamp() -> str:
    return datetime.now().strftime("%Y%m%d%H%M%S")

def format_phone(phone: str) -> int:
    if phone.startswith("+"):
        return int(phone[1:])
    elif phone.startswith("0"):
        return int("254" + phone[1:])
    return int(phone)
