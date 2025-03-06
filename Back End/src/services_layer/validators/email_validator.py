def validate_email(email):
    return email if "@" in email and "." in email else None